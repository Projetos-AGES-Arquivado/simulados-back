import exame.Exame;
import exame.Opcao;
import exame.Questao;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

public class Parser {
    
    private static final HashMap<Integer, ArrayList<Exame>> examesPorAno = new HashMap<Integer, ArrayList<Exame>>();
    private static List<Exame> exames = new ArrayList<Exame>(); 
    private static List<Questao> questoes = new ArrayList<Questao>();    
    private static List<Opcao> opcoes = new ArrayList<Opcao>();
    
    public static void main(String[] args) {
        
        try {
           
            List<String[]> list = clean();
            
           for(String[] s : list)
           System.out.println(Arrays.toString(s));
            
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
            
            /*
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
            */
            
            questoes = list.stream()
                    .filter(s -> !(s[1].contains("pdf")))
                    .filter(s -> s[2].trim().length() > 3)
                    .map(s -> createQuestion(s))
                    .collect(Collectors.toList());
            
            System.out.println("Coletei " + questoes.size() + " questoes");
            
            for(Questao q : questoes){
                //System.out.println("Questão " + q.getId() + " do exame " + q.getExam_id());
                for(Exame e : exames){
                    //System.out.println("Verificando exame " + e.getId());
                    if(q.getExam_id() == e.getId()){
                        //System.out.println("Encontrado, adicionando");
                        e.addQuestao(q);
                        break;
                    }
                }
            }
            
            /*
            
            //For testing purposes. Each exam should have 80 questions 
            for(Exame e : exames)
                System.out.println("Exame " + e.getId() + " contém " + e.getQuestoes().size());
        
            */
            
            opcoes = list.stream()
                    .filter(s -> !(s[1].contains("pdf")))
                    .filter(s -> s[2].trim().length() == 3)
                    .map(s -> createOpcao(s))
                    .collect(Collectors.toList());
            
            System.out.println("Coletei " + opcoes.size() + " opcoes");
            
            for(Opcao o : opcoes){
                //System.out.println("Opcao " + o.getLetra() + " da questao " + o.getQuestionId() + " do exame " + o.getExamId());
                
                for(Exame e : exames){
                    if(o.getExamId() == e.getId()){
                        //System.out.println("Encontrei exame " + e.getId());
                        
                        for(Questao q : e.getQuestoes()){
                            //System.out.println("Verificando questao " + q.getId() + " do exame " + q.getExam_id());
                            if(o.getQuestionId()== q.getId()){
                            //System.out.println("Encontrado, adicionando");
                            q.addOpcao(o);
                            break;
                            }
                        }
                    }
                }   
            }
            
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static List<String[]> clean() throws IOException {
        
        List<String[]> list = Files.lines(Paths.get("inserts.sql"))
                    .filter(s -> !s.contains("insert") && !s.contains("commit"))
                    .map(s -> s.replaceAll("values\\(", ""))
                    .map(s -> s.replaceAll("\\);", ""))
                    .map(s -> s.replaceAll("\\[", ""))
                    .map(s -> s.replaceAll("\\]", ""))                    
                    .map(s -> s.split(","))
                    .collect(Collectors.toList());
        for(String[] line : list){
            for(String string : line)
                string.trim();
        }
        return list;
    }
    
    private static int getDate(String nonFormatedDate){

        SimpleDateFormat sdf = new SimpleDateFormat("EEE MMM dd HH:mm:ss Z yyyy", new Locale("pt", "BR"));

        String formatedDate = "";

        for (int i = nonFormatedDate.length()-5, count = 0; count < 4 ; i++, count++)
            formatedDate += nonFormatedDate.charAt(i);

        return Integer.parseInt(formatedDate);
    }

    private static Exame createExam(String[] s) {
        
        int examYear = getDate(s[3]);
        int numExam = Integer.parseInt(s[0]);
        Exame exame = new Exame(numExam, examYear);        
        return exame;        
    }

    private static Questao createQuestion(String[] s) {
    	
    	StringBuilder sb = new StringBuilder();
        for(int i = 2; i < s.length-1; i++){
            String aux = s[i].trim();
            aux += " ";
            sb.append(aux);
        }

        boolean erased = true;
        
        while(erased){
            erased = false;        
            if(sb.toString().contains("  ")){
                sb.toString().replaceAll("  "," ");
                erased = true;
            }
        }
        
        int examID = Integer.parseInt(s[0].trim()); 
        int questionID = Integer.parseInt(s[1].trim());
        String statment = sb.toString().trim();
        Questao questao = new Questao(examID, questionID, statment);
        //System.out.println(questao);
        return questao;
    }

    private static Opcao createOpcao(String [] line){
        
        StringBuilder sb = new StringBuilder();
        
        for(int i = 3; i < line.length; i++){
            String aux = line[i].trim();
            aux += " ";
            sb.append(aux);
        }

        boolean erased = true;
        
        while(erased){
            erased = false;        
            if(sb.toString().contains("  ")){
                sb.toString().replaceAll("  "," ");
                erased = true;
            }
        }
        
        int examID = Integer.parseInt(line[0].trim()); 
        int questionID = Integer.parseInt(line[1].trim());
        char letra = line[2].trim().charAt(1);
        
        
        return new Opcao(examID, questionID, letra, sb.toString(), false);
    }
}
