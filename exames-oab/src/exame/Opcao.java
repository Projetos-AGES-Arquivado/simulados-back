package exame;

public class Opcao {
    private String description;
    private boolean correct;
    private final int professor_id = 1;

    public Opcao(String description, boolean correct) {
        this.description = description;
        this.correct = correct;
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
