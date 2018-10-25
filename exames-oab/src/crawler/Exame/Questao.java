package Exame;

import java.util.ArrayList;

public class Questao {

    public Questao(int numero, String enunciado, char opcaoCorreta) {
        this.numero = numero;
        this.enunciado = enunciado;
        this.opcoes = new ArrayList<Opcao>();
        this.opcaoCorreta = opcaoCorreta;
    }

    private int numero;

    private String enunciado;

    private ArrayList<Opcao> opcoes;

    private char opcaoCorreta;

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getEnunciado() {
        return enunciado;
    }

    public void setEnunciado(String enunciado) {
        this.enunciado = enunciado;
    }

    public ArrayList<Opcao> getOpcoes() {
        return opcoes;
    }

    public void adicionaOpcao(Opcao opcao) {
        this.opcoes.add(opcao);
    }

    public char getOpcaoCorreta() {
        return opcaoCorreta;
    }

    public void setOpcaoCorreta(char opcaoCorreta) {
        this.opcaoCorreta = opcaoCorreta;
    }
}
