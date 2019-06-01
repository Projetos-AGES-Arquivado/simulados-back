package crawler.Exame;

import java.io.File;
import java.io.FileOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import static crawler.Coleta.ColetaExamesOAB.filePath;

public class Exame {

    public Exame(int numero, URL urlExame, URL urlGabarito, Date data, int modelo) {
        this.numero = numero;
        this.urlExame = urlExame;
        this.filePathExame = "";
        this.urlGabarito = urlGabarito;
        this.filePathGabarito = "";
        this.data = data;
        this.modelo = modelo;
        this.questoes = new ArrayList<Questao>();
        this.exameTXT = "";
    }

    private int numero;
    private URL urlExame;
    private String filePathExame;
    private URL urlGabarito;
    private String filePathGabarito;
    private Date data;
    private int modelo;
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

    public String getFilePathExame() {
        return filePathExame;
    }
    public void setFilePathExame(String filePathExame) {
        this.filePathExame = filePathExame;
    }

    public URL getUrlGabarito() {
        return urlGabarito;
    }
    public void setUrlGabarito(URL urlGabarito) {
        this.urlGabarito = urlGabarito;
    }

    public String getFilePathGabarito() {
        return filePathGabarito;
    }
    public void setFilePathGabarito(String filePathGabarito) {
        this.filePathGabarito = filePathGabarito;
    }

    public Date getData() {
        return data;
    }
    public void setData(Date data) {
        this.data = data;
    }

    public int getModelo() {
        return modelo;
    }
    public void setModelo(int modelo) {
        this.modelo = modelo;
    }

    public ArrayList<Questao> getQuestoes() {
        return questoes;
    }
    private void adicionaQuestao(Questao questao) {
        questoes.add(questao);
    }

    protected String exameTXT;

    public boolean download(String outputFilePath) {
        try {
            this.filePathExame = outputFilePath + ".pdf";
            File outputExameFile = new File(this.filePathExame);
            if (!outputExameFile.exists()) {
                ReadableByteChannel channel = Channels.newChannel(this.getUrlExame().openStream());
                FileOutputStream outputStream = new FileOutputStream(this.filePathExame);
                outputStream.getChannel().transferFrom(channel, 0, Long.MAX_VALUE);
                outputStream.close();
            }
            this.filePathGabarito = outputFilePath + "_gabarito.pdf";
            File outputGabaritoFile = new File(this.filePathGabarito);
            if (!outputGabaritoFile.exists()) {
                ReadableByteChannel channel = Channels.newChannel(this.getUrlGabarito().openStream());
                FileOutputStream outputStream = new FileOutputStream(this.filePathGabarito);
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

    public void parseQuestoes() {

        PDDocument examePDF;
        try {
            File exameFile = new File(this.filePathExame);
            examePDF = PDDocument.load(exameFile);
            this.exameTXT = new PDFTextStripper().getText(examePDF); // Converte o exame de PDF para TXT.
            examePDF.close();
        } catch (Exception e) {
            System.out.println("Erro: " + e.getMessage());
        }

        try {

            // Remove quebras de linha e espaços em branco adicionais.
            this.exameTXT = this.exameTXT.replaceAll(" \\r\\n", "\r\n");
            this.exameTXT = this.exameTXT.replaceAll("(\\r\\n)+", "\r\n");
            this.exameTXT = this.exameTXT.replaceAll("( )+", " ");

        } catch (Exception e) {
            System.out.println("Erro: " + e.getMessage());
        }

    }

}

public class ExameModelo1 extends Exame {

    public ExameModelo1(int numero, URL urlExame, URL urlGabarito, Date data, int modelo) {
        super(numero, urlExame, urlGabarito, data, modelo);
    }

    public void parseQuestoes() {

        super.parseQuestoes();

        try {

            // Remove rodapés de páginas.
            List<String> list = new ArrayList<String>();
            Matcher matchRodape = Pattern.compile("(^ \\d+.+?)(?=Questão)|(^ \\d+.+?)(?=QUESTIONÁRIO)", Pattern.DOTALL + Pattern.MULTILINE).matcher(exameTXT); // Localiza os rodapés.
            while (matchRodape.find()) {
                Matcher matchNumeroPagina = Pattern.compile("(^ \\d+\\r\\n)", Pattern.DOTALL + Pattern.MULTILINE).matcher(matchRodape.group());
                if (matchNumeroPagina.find()) {
                    exameTXT = exameTXT.replace(matchRodape.group(), "");
                }
            }

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
                                    opcao = opcao.replace(matchQuestionario.group(), ".");
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
