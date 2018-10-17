package Exame;

import java.io.File;
import java.io.FileOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static Coleta.ColetaExamesOAB.filePath;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

public class Exame {

    public Exame (int numero, URL urlExame, URL urlGabarito, Date data) {
        this.numero = numero;
        this.urlExame = urlExame;
        this.urlGabarito = urlGabarito;
        this.data = data;
        this.questoes = new ArrayList<Questao>();
    }

    private int numero;

    private Date data;

    private URL urlExame;

    private String filePathExame;

    private URL urlGabarito;

    private String filePathGabarito;

    private ArrayList<Questao> questoes;

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public URL getUrlExame() {
        return urlExame;
    }

    public void setUrlExame(URL urlExame) {
        this.urlExame = urlExame;
    }

    public URL getUrlGabarito() {
        return urlGabarito;
    }

    public void setUrlGabarito(URL urlGabarito) {
        this.urlGabarito = urlGabarito;
    }

    public int getData() {    	
    	 
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(data);
        
        return calendar.get(calendar.YEAR);
    }

    public void setData(Date data) {
        this.data = data;
    }

    public ArrayList<Questao> getQuestoes() {
        return questoes;
    }

    private void adicionaQuestao (Questao questao) {
        questoes.add(questao);
    }


    private boolean download(URL file, String outputFilePath) {
        // Realiza o download.
        try {
            File outputFile = new File(outputFilePath);
            if (!outputFile.exists()) {
                ReadableByteChannel channel = Channels.newChannel(file.openStream());
                FileOutputStream outputStream = new FileOutputStream(outputFilePath);
                outputStream.getChannel().transferFrom(channel, 0, Long.MAX_VALUE);
                outputStream.close();
            }
            return true;
        } catch (Exception e) {
            System.out.println("Erro: " + e.getMessage());
            System.exit(1);
        }
        return false;
    }

    public void coleta () {
        String exameFilePath = filePath + this.getUrlExame().getFile().toString().substring(this.getUrlExame().getFile().toString().lastIndexOf("/") + 1, this.getUrlExame().getFile().toString().length());
        if (this.download(this.getUrlExame(), exameFilePath)) {
            this.parse(exameFilePath);
        }
    }

    public void parse(String exameFilePath) {

        PDDocument examePDF;
        String exameTXT = "";
        try {
            File exameFile = new File(exameFilePath);
            examePDF = PDDocument.load(exameFile);
            exameTXT = new PDFTextStripper().getText(examePDF); // Converte o exame de PDF para TXT.
            examePDF.close();
        } catch (Exception e) {
            System.out.println("Erro: " + e.getMessage());
        }

        try {

            // Remove quebras de linha e espaços em branco adicionais.
            exameTXT = exameTXT.replaceAll(" \\r\\n", "\r\n");
            exameTXT = exameTXT.replaceAll("(\\r\\n)+", "\r\n");
            exameTXT = exameTXT.replaceAll("( )+", " ");

            // Remove rodapés de páginas.
            List<String> list = new ArrayList<String>();
            Matcher matchRodape = Pattern.compile("(^ \\d+.+?)(?=Questão)|(^ \\d+.+?)(?=QUESTIONÁRIO)", Pattern.DOTALL + Pattern.MULTILINE).matcher(exameTXT); // Localiza os rodapés.
            while (matchRodape.find()) {
                Matcher matchNumeroPagina = Pattern.compile("(^ \\d+\\r\\n)", Pattern.DOTALL + Pattern.MULTILINE).matcher(matchRodape.group());
                if (matchNumeroPagina.find()) {
                    exameTXT = exameTXT.replace(matchRodape.group(), "");
                }
            }

            // Processa gabarito.

            // Processa questões.
            ArrayList<String> questoesTXT = new ArrayList<String>();
            questoesTXT.addAll(Arrays.asList(exameTXT.split("(?=((Questão \\d+)|(Questão\\d+)))"))); // Quebra o exame em questões.
            for (String questao : questoesTXT) { // Percorre cada uma das questões do exame.
                Matcher matchQuestao = Pattern.compile("(^Questão \\d+)|(^Questão\\d+)").matcher(questao);
                if (matchQuestao.find()) {
                    int numQuestao = questoesTXT.indexOf(questao);
                    questao = questao.replaceAll("\\r\\n", " "); // Limpa as quebras de parágrafo que o PDF usa como quebras de linhas.
                    questao = questao.replaceAll(" +", " "); // Limpa espaços em branco múltiplos.
                    ArrayList<String> opcoes = new ArrayList<String>();
                    opcoes.addAll(Arrays.asList(questao.split("(?=((A\\)\\s)|(B\\)\\s)|(C\\)\\s)|(D\\)\\s)))"))); // Quebra a questão em enunciado e opções. São 4 opções por questão.
                    for (String opcao : opcoes) {
                        if (opcoes.indexOf(opcao) == 0) { // Processa o enunciado.
                            opcao = opcao.replaceAll("( \\.)", "\\.");
                            if (opcao.charAt(opcao.length() - 1) == ' ') {
                                opcao = opcao.substring(0, opcao.length() - 1);
                            }
                            Matcher matchEnunciado = Pattern.compile("(^Questão \\d+ )|(^Questão\\d+ )").matcher(opcao);
                            if (matchEnunciado.find()) {
                                String enunciado = opcao.substring(matchEnunciado.end(), opcao.length());
                                this.adicionaQuestao(new Questao(numQuestao, enunciado, 'A'));
                            }
                        } else if (opcoes.indexOf(opcao) < 5) { // Processa as opções. Testa número de opções para descartar o questionário de avaliação da prova que vai após as 4 opções da última questão.
                            opcao = opcao.replaceAll("(\\s\\.)", "\\.");
                            if (opcao.charAt(opcao.length() - 1) == ' ') {
                                opcao = opcao.substring(0, opcao.length() - 1);
                            }
                            Matcher matchOpcao = Pattern.compile("(A\\)\\s|B\\)\\s|C\\)\\s|D\\)\\s)").matcher(opcao);
                            if (matchOpcao.find()) {
                                String letraOpcao = opcao.substring(0, 1);
                                Matcher matchQuestionario = Pattern.compile("\\. QUESTIONÁRIO .+$").matcher(opcao);
                                if (matchQuestionario.find()) {
                                    opcao = opcao.replace(matchQuestionario.group(), "." );
                                }
                                String textoOpcao = opcao.substring(3, opcao.length());
                                this.getQuestoes().get(numQuestao - 1).adicionaOpcao(new Opcao(letraOpcao, textoOpcao));
                            }
                         } else { // Encerra o processamento das questões após a 4a opção da última questão.
                            break;
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Erro: " + e.getMessage());
        }

    }

}
