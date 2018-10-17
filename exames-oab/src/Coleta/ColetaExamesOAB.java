package Coleta;

import Exame.Exame;
import Exame.Exames;
import Exame.Opcao;
import Exame.Questao;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.Calendar;

public class ColetaExamesOAB {

    public static final String filePath = "/home/14202112/OAB/simulados-back/exames-oab/data/";
    public static final String outputFileName = "inserts.sql";

    public static void main(String[] args) {

        System.setProperty("sun.java2d.cmm", "sun.java2d.cmm.kcms.KcmsServiceProvider");

        System.out.println("Coletando exames da OAB...");

        final File outputDoc = new File(filePath + outputFileName);
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(outputDoc));
            int i = 0;
            for (Exame exame : Exames.getExames()) {
                exame.coleta();                
                System.out.println(i);
                i++;
               
                
                writer.write("insert into practise_exam (aob_exam, aob_exam_year, aob_exam_serial)\r\nvalues(" + "true" + ", " + exame.getData() +", " + exame.getNumero() + ");\r\n");
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
        System.out.println("cabo");
    }

}
