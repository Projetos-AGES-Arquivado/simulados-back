package exame;


import java.util.ArrayList;


public class Exame {

    private int id;
    private final boolean aob_exam = true;
    private int aob_exam_year;
    private int aob_exam_serial;
    private ArrayList<Questao> questoes;


    public Exame(int id, int aob_exam_year) {
        this.id = id;
        this.aob_exam_year = aob_exam_year;
        this.aob_exam_serial = 0;
        this.questoes = new ArrayList<>();
    }

    public boolean isAob_exam() {
        return aob_exam;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAob_exam_year() {
        return aob_exam_year;
    }

    public void setAob_exam_year(int aob_exam_year) {
        this.aob_exam_year = aob_exam_year;
    }

    public int getAob_exam_serial() {
        return aob_exam_serial;
    }

    public void setAob_exam_serial(int aob_exam_serial) {
        this.aob_exam_serial = aob_exam_serial;
    }

    public ArrayList<Questao> getQuestoes() {
        return questoes;
    }

    public void setQuestoes(ArrayList<Questao> questoes) {
        this.questoes = questoes;
    }

    @Override
    public String toString() {
        return "Exame{" + "id=" + id + ", aob_exam=" + aob_exam + ", aob_exam_year=" + aob_exam_year + ", aob_exam_serial=" + aob_exam_serial + ", questoes=" + questoes + '}';
    }

   
}