package Exame;

import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public enum Exames {

//    Exame2(2,
//            "https://dpmzos25m8ivg.cloudfront.net/112/FECHADO_01.pdf",
//            "https://dpmzos25m8ivg.cloudfront.net/112/oab10_gab_preliminar_01.pdf",
//            "26/09/2010"
//    ),
//    Exame3(3,
//            "https://dpmzos25m8ivg.cloudfront.net/134/Tipo%201.pdf",
//            "https://dpmzos25m8ivg.cloudfront.net/134/Gabarito%20com%20correspond%C3%AAncia.pdf",
//            "13/02/2011"
//    ),
//    Exame4(4,
//            "https://dpmzos25m8ivg.cloudfront.net/157/IV_EOU_Tipo_1.pdf",
//            "https://dpmzos25m8ivg.cloudfront.net/157/Gabarito%20com%20correspond%C3%AAncia.pdf",
//            "17/07/2011"
//    ),
//    Exame5(5,
//            "https://dpmzos25m8ivg.cloudfront.net/163/V%20Exame%20Tipo%201.pdf",
//            "https://dpmzos25m8ivg.cloudfront.net/163/Gabarito%20Quest%C3%B5es%20Objetivas.pdf",
//            "30/10/2011"
//    ),
//    Exame6(6,
//            "https://dpmzos25m8ivg.cloudfront.net/165/VI%20Exame%20Tipo%201.pdf",
//            "https://dpmzos25m8ivg.cloudfront.net/165/Gabarito%20Quest%C3%B5es%20objetivas%20-%20VI%20Exame.pdf",
//            "05/02/2012"
//    ),
//    Exame7(7,
//            "",
//            "",
//            ""
//    ),
//    Exame8(8,
//            "https://dpmzos25m8ivg.cloudfront.net/240/20120909080819-CADERNO_VIII_EXAME_TIPO_01.pdf",
//            "https://dpmzos25m8ivg.cloudfront.net/240/20120909080551-GABARITOS%20PRELIMINARES_VIII_EXAME_DE_ORDEM1518468418.pdf",
//            "09/09/2012"
//    ),
//    Exame9(9,
//            "https://dpmzos25m8ivg.cloudfront.net/270/20121217074726-CADERNO_IX_EXAME_TIPO_01.pdf",
//            "https://dpmzos25m8ivg.cloudfront.net/270/20121217085531-GABARITOS%20PRELIMINARES_IX_EXAME_DE_ORDEM.pdf",
//            "16/12/2012"
//    ),
//    Exame10(10,
//            "https://dpmzos25m8ivg.cloudfront.net/303/20130429114315-CADERNO_X_EXAME_TIPO_01_vf.pdf",
//            "https://dpmzos25m8ivg.cloudfront.net/303/20130502093708-GABARITOS%20PRELIMIARES_X_EXAME_DE_ORDEM.pdf",
//            "28/04/2013"
//    ),
//    Exame11(11,
//            "https://dpmzos25m8ivg.cloudfront.net/336/20130819085026-CADERNO%20TIPO%2001_BRANCA_XI_EXAME.pdf",
//            "https://dpmzos25m8ivg.cloudfront.net/336/20130818072221-GABARITOS%20PRELIMIARES_XI_EXAME_DE_ORDEM.pdf",
//            "18/08/2013"
//    ),
//    Exame12(12,
//            "https://dpmzos25m8ivg.cloudfront.net/382/20131215064829-CADERNO%20TIPO%2001_BRANCA_XII_EXAME.pdf",
//            "https://dpmzos25m8ivg.cloudfront.net/382/20131215065043-GABARITOS%20PRELIMINARES_XII_EXAME_DE_ORDEM.pdf",
//            "15/12/2013"
//    ),
//    Exame13(13,
//            "https://dpmzos25m8ivg.cloudfront.net/421/20140413061359-CADERNO%20TIPO%2001_BRANCA_XIII_EXAME-1.pdf",
//            "https://dpmzos25m8ivg.cloudfront.net/421/20140413060423-GABARITOS%20PRELIMIARES_XIII_EXAME_DE_ORDEM.pdf",
//            "13/04/2014"
//    ),
//    Exame14(14,
//            "https://dpmzos25m8ivg.cloudfront.net/461/20140803063329-CADERNO%20TIPO%2001_BRANCA_XIV_EXAME.pdf",
//            "https://dpmzos25m8ivg.cloudfront.net/461/20140803070701-GABARITOS%20PRELIMIARES_XIV_EXAME_DE_ORDEM.pdf",
//            "03/08/2014"
//    ),
//    Exame15(15,
//            "https://dpmzos25m8ivg.cloudfront.net/513/20141116074254-CADERNO_TIPO_1_XV_EXAME.pdf",
//            "https://dpmzos25m8ivg.cloudfront.net/513/07012015084740_Gabaritos%20Definitivos.pdf",
//            "16/11/2014"
//    ),
//    Exame16(16,
//            "https://dpmzos25m8ivg.cloudfront.net/615/15032015183319_CADERNO_TIPO_1_XVI_EXAME.pdf",
//            "https://dpmzos25m8ivg.cloudfront.net/615/17042015171107_GABARITOS%20DEFINITIVOS_XVI_EXAME_DE_ORDEM.pdf",
//            "15/03/2015"
//    ),
//    Exame17(17,
//            "https://dpmzos25m8ivg.cloudfront.net/616/19072015182947_CADERNO_TIPO_1_XVII_EXAME.pdf",
//            "https://dpmzos25m8ivg.cloudfront.net/616/21082015081947_GABARITOS_DEFINITIVOS_XVII_EXAME_DE_ORDEM.pdf",
//            "19/07/2015"
//    ),
//    Exame18(18,
//            "https://dpmzos25m8ivg.cloudfront.net/617/29112015184841_CADERNO_TIPO_1_XVIII_EXAME.pdf",
//            "https://dpmzos25m8ivg.cloudfront.net/617/29112015184750_GABARITOS%20PRELIMIARES_XVIII_EXAME_DE_ORDEM.pdf",
//            "29/11/2015"
//    ),
//    Exame19(19,
//            "https://dpmzos25m8ivg.cloudfront.net/620/05072016131425_CADERNO_TIPO_1_XIX_EXAME_alterado_FGV.pdf",
//            "https://dpmzos25m8ivg.cloudfront.net/620/04042016151028_GABARITOS%20PRELIMIARES_XIX_EXAME_DE_ORDEM.pdf",
//            "03/04/2016"
//    ),
    Exame20(20,
            "https://dpmzos25m8ivg.cloudfront.net/621/24072016185034_CADERNO_TIPO_1_XX_EXAME.pdf",
            "https://dpmzos25m8ivg.cloudfront.net/621/24072016185147_GABARITOS%20PRELIMIARES_XX_EXAME_DE_ORDEM.pdf",
            "24/07/2016"
    ),
    Exame21(21,
            "https://dpmzos25m8ivg.cloudfront.net/624/27112016173211_CADERNO_TIPO_1_XXI_EXAME.pdf",
            "https://dpmzos25m8ivg.cloudfront.net/624/27112016191040_GABARITOS%20PRELIMIARES_XXI_EXAME_DE_ORDEM.pdf",
            "27/11/2016"
    ),
    Exame22(22,
            "https://dpmzos25m8ivg.cloudfront.net/625/02042017172423_CADERNO_TIPO_1_XXII_EXAME.pdf",
            "https://dpmzos25m8ivg.cloudfront.net/625/02042017181751_GABARITOS%20PRELIMIARES_XXII_EXAME_DE_ORDEM.pdf",
            "02/04/2017"
    ),
    Exame23(23,
            "https://dpmzos25m8ivg.cloudfront.net/626/853921_CADERNO_TIPO_1_XXIII_EXAME.pdf",
            "https://dpmzos25m8ivg.cloudfront.net/626/101773_GABARITOS%20PRELIMIARES_XXIII_EXAME_DE_ORDEM.pdf",
            "23/07/2017"
    ),
    Exame24(24,
            "https://dpmzos25m8ivg.cloudfront.net/627/1373500_Caderno%20de%20Prova%20-%20Tipo%201.pdf",
            "https://dpmzos25m8ivg.cloudfront.net/627/85320_Gabaritos%20Preliminares%20da%20Prova%20Objetiva%20(1%C2%AA%20fase).pdf",
            "19/11/2017"
    ),
    Exame25(25,
            "https://dpmzos25m8ivg.cloudfront.net/628/1299791_CADERNO_TIPO_1_XXV_EXAME.pdf",
            "https://dpmzos25m8ivg.cloudfront.net/628/85182_GABARITOS%20PRELIMIARES_XXV_EXAME_DE_ORDEM.pdf",
            "08/04/2018"
    ),
    Exame26(26,
            "https://dpmzos25m8ivg.cloudfront.net/629/882160_CADERNO_TIPO_1_XXVI_EXAME.pdf",
            "https://dpmzos25m8ivg.cloudfront.net/629/85363_GABARITOS%20PRELIMIARES_XXVI_EXAME_DE_ORDEM%20(1).pdf",
            "05/08/2018"
    );

    private static final ArrayList<Exame> values;

    private Exame exame = null;

    static {
        values = new ArrayList<Exame>();
        for (Exames exames : Exames.values()) {
            values.add(exames.exame);
        }
    }

    Exames (int numero, String urlExame, String urlGabarito, String data) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
            this.exame = new Exame(numero, new URL(urlExame), new URL(urlGabarito), formatter.parse(data));
        } catch (Exception e) {
            System.out.println("Erro: " + e.getMessage());
            System.exit(1);
        }
    }

    public static ArrayList<Exame> getExames() {
        return values;
    }

}
