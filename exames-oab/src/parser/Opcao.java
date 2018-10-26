package exame;

public class Opcao {
    private char letra;
    private String description;
    private boolean correct;
    private int examId;
    private int questionId;
    private final int professor_id = 1;

    public Opcao(int examId, int questionId, char letra, String description, boolean correct) {
        this.examId = examId;
        this.questionId = questionId;
        this.letra = letra;
        this.description = description;
        this.correct = correct;
    }

    public int getExamId() {
        return examId;
    }

    public void setExamId(int examId) {
        this.examId = examId;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public char getLetra() {
        return letra;
    }

    public void setLetra(char letra) {
        this.letra = letra;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean correct) {
        this.correct = correct;
    }

    public int getProfessor_id() {
        return professor_id;
    }
}
