import exame.Exame;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

public class Parser {
    
    private static HashMap<Integer, ArrayList<Exame>> examesPorAno = new HashMap<Integer, ArrayList<Exame>>();
    private static List<Exame> exames = new ArrayList<Exame>(); 
    
    public static void main(String[] args) {

        
        try {
            List<String[]> list = Files.lines(Paths.get("inserts.sql"))
                    .filter(s -> !s.contains("insert") && !s.contains("commit"))
                    .map(s -> s.replaceAll("values\\(", ""))
                    .map(s -> s.replaceAll("\\);", ""))
                    .map(s -> s.replaceAll("\\[", ""))
                    .map(s -> s.replaceAll("\\]", ""))                    
                    .map(s -> s.split(","))
                    .collect(Collectors.toList());
            
            exames = list.stream()
                   .filter(s -> s[1].contains("pdf"))                   
                   .map(s -> createExam(s))                   
                   .collect(Collectors.toList());
            
            System.out.println("Coletei " + exames.size() + " exames");
            
            for(Exame exame : exames){
                ArrayList<Exame> aux;
                aux = examesPorAno.getOrDefault(exame.getAob_exam_year(), new ArrayList<>());
                aux.add(exame);
                examesPorAno.put(exame.getAob_exam_year(), aux);
                exame.setAob_exam_serial(examesPorAno.get(exame.getAob_exam_year()).size());
            }
            
            //For testing purposes. Should return two 2016 exams 
            ArrayList<Exame> ex2016 = examesPorAno.get(2016);
            
            for(Exame ex : ex2016)
                System.out.println(ex);
            
            //For testing purposes. Should return two 2017 exams 
            ArrayList<Exame> ex2017 = examesPorAno.get(2017);
            
            for(Exame ex : ex2017)
                System.out.println(ex);
            
            //For testing purposes. Should return two 2018 exams 
            ArrayList<Exame> ex2018 = examesPorAno.get(2018);
            
            for(Exame ex : ex2018)
                System.out.println(ex);
            
            //For testing purposes. Should return a total of 6 exams
            System.out.println("Coletei " + exames.size() + " exames");            
           
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static Exame createExam(String[] line) {
        
        int examYear = getDate(line[3]);
        int numExam = Integer.parseInt(line[0]);
        Exame exame = new Exame(numExam, examYear);        
        return exame;        
    }

        private static int getDate(String nonFormatedDate){
            
            SimpleDateFormat sdf = new SimpleDateFormat("EEE MMM dd HH:mm:ss Z yyyy", new Locale("pt", "BR"));
        
            String formatedDate = "";
            
            for (int i = nonFormatedDate.length()-5, count = 0; count < 4 ; i++, count++)
                formatedDate += nonFormatedDate.charAt(i);
            
            return Integer.parseInt(formatedDate);
        }
}
