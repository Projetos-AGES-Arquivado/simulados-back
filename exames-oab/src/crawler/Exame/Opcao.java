package crawler.Exame;

public class Opcao {

    public Opcao(String letra, String texto) {
        this.letra = letra;
        this.texto = texto;
    }
    private String letra;

    private String texto;

    public String getLetra() {
        return letra;
    }

    public void setLetra(String letra) {
        this.letra = letra;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }
}
