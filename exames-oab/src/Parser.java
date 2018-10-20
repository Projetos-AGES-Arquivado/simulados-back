import exame.Exame;
import exame.Questao;
import org.springframework.cglib.core.Local;

import java.io.IOException;
import java.lang.reflect.Array;
import java.nio.file.Files;
import java.nio.file.Paths;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;


public class Parser {
    public static void main(String[] args) {

        HashMap<String, ArrayList<Exame>> examesPorAno = new HashMap<>();

        try {
            List<String[]> list = Files.lines(Paths.get("inserts.sql"))
                    .filter(s -> !s.contains("insert") && !s.contains("commit"))
                    .map(s -> s.replaceAll("values\\(", ""))
                    .map(s -> s.replaceAll("\\);", ""))
                    .map(s -> s.split(","))
                    .collect(Collectors.toList());


            SimpleDateFormat sdf = new SimpleDateFormat("EEE MMM dd HH:mm:ss Z yyyy", new Locale("pt", "BR"));

            for (int i = 0; i < list.size(); i+=401) {
                final String[] values = list.get(i);
                String  data = "";
                String date = values[3];
                int length = date.length();

                for (int g = length - 3, count = 0; count < 4 ; g--, count++) {
                    data += date.charAt(g );
                }
                StringBuilder stringBuffer = new StringBuilder(data);
                Exame exame = new Exame(Integer.parseInt(values[0].replace("[","")), Integer.parseInt(stringBuffer.reverse().toString()));
                ArrayList<Exame> exames = examesPorAno.getOrDefault(exame.toString(), new ArrayList<>());
                exame.setAob_exam_serial(exames.size() + 1);
                exames.add(exame);
                examesPorAno.put(exame.toString(), exames);
            }

            for (int i = 1; i < list.size(); i+=5) {
                final String[] values = list.get(i);
                System.out.println(Arrays.toString(values));
                Questao q = new Questao(Integer.parseInt(values[1].trim()), values[2], new ArrayList<>(), values[3].charAt(1));
                q.setExam_id(Integer.parseInt(values[0].replace("[","")));

//              System.out.println(q);
                for (int j = i + 1; j <= i + 4; j++) {
//                    System.out.println(Arrays.toString(list.get(j)));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
