package parser;

public class Opcao {
    private char letra;
    private String description;
    private boolean correct;
    private int examSerial;
    private int questionSerial;
    private static int quant = 0;
    private int id;
    private final int professor_id = 1;

    public Opcao(int examSerial, int questionSerial, char letra, String description, boolean correct) {
        quant++;
        id = quant;
    	this.examSerial = examSerial;
        this.questionSerial = questionSerial;
        this.letra = letra;
        this.description = description;
        this.correct = correct;
    }

    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setExamSerial(int examSerial) {
		this.examSerial = examSerial;
	}

	public int getExamSerial() {
        return examSerial;
    }

    public void setExamId(int examSerial) {
        this.examSerial = examSerial;
    }

    public int getQuestionSerial() {
        return questionSerial;
    }

    public void setQuestionSerial(int questionSerial) {
        this.questionSerial = questionSerial;
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
