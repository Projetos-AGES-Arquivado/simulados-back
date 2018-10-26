package crawler.Coleta;

import crawler.Exame.Exame;
import crawler.Exame.Exames;
import crawler.Exame.Opcao;
import crawler.Exame.Questao;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

public class ColetaExamesOAB {

    public static final String filePath = "C:/Users/Eduardo Arruda/Documents/src/AGES/simulados/simulados-back/exames-oab/data/";
    public static final String outputFileName = "inserts.sql";

    public static void main(String[] args) {

        System.setProperty("sun.java2d.cmm", "sun.java2d.cmm.kcms.KcmsServiceProvider");

        System.out.println("Coletando exames da OAB...");

        final File outputDoc = new File(filePath + outputFileName);
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(outputDoc));
            for (Exame exame : Exames.getExames()) {
                exame.coleta();
                writer.write("insert into exames (num_exame, url_exame, url_gabarito, data)\r\nvalues(" + Integer.toString(exame.getNumero()) + ", '" + exame.getUrlExame() + "', '" + exame.getUrlGabarito() + "', '" + exame.getData() + "');\r\n");
                for (Questao questao : exame.getQuestoes()) {
                    writer.write("insert into questoes (num_exame, num_questao, enunciado, opcao_correta)\r\nvalues(" + Integer.toString(exame.getNumero()) + ", " + Integer.toString(questao.getNumero()) + ", '" + questao.getEnunciado() + "', '" + questao.getOpcaoCorreta() + "');\r\n");
                    for (Opcao opcao : questao.getOpcoes()) {
                        writer.write("insert into opcoes (num_exame, num_questao, letra_opcao, texto)\r\nvalues(" + Integer.toString(exame.getNumero()) + ", " + Integer.toString(questao.getNumero()) + ", '" + opcao.getLetra() + "', '" + opcao.getTexto() + "');\r\n");
                    }
                }
                writer.write("commit;\r\n");
            }
            writer.close();
        } catch (Exception e) {
            System.out.println("Erro: " + e.getMessage());
        }
    }

}