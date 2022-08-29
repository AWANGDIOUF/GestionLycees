package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import mefpai.gouv.sn.domain.enumeration.DAKAR;
import mefpai.gouv.sn.domain.enumeration.DIOURBEL;
import mefpai.gouv.sn.domain.enumeration.FATICK;
import mefpai.gouv.sn.domain.enumeration.KAFFRINE;
import mefpai.gouv.sn.domain.enumeration.KAOLACK;
import mefpai.gouv.sn.domain.enumeration.KEDOUGOU;
import mefpai.gouv.sn.domain.enumeration.KOLDA;
import mefpai.gouv.sn.domain.enumeration.LOUGA;
import mefpai.gouv.sn.domain.enumeration.MATAM;
import mefpai.gouv.sn.domain.enumeration.Region;
import mefpai.gouv.sn.domain.enumeration.SAINTLOUIS;
import mefpai.gouv.sn.domain.enumeration.SEDHIOU;
import mefpai.gouv.sn.domain.enumeration.TAMBACOUNDA;
import mefpai.gouv.sn.domain.enumeration.THIES;
import mefpai.gouv.sn.domain.enumeration.ZIGINCHOR;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A LyceeTechnique.
 */
@Entity
@Table(name = "lycee_technique")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LyceeTechnique implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "prenom_nom", nullable = false)
    private String prenomNom;

    @NotNull
    @Column(name = "adresse", nullable = false)
    private String adresse;

    @NotNull
    @Column(name = "mail", nullable = false)
    private String mail;

    @NotNull
    @Column(name = "tel_1", nullable = false)
    private String tel1;

    @NotNull
    @Column(name = "tel_2", nullable = false)
    private String tel2;

    @NotNull
    @Column(name = "boite_postal", nullable = false)
    private String boitePostal;

    @NotNull
    @Column(name = "decret_creation", nullable = false)
    private String decretCreation;

    @NotNull
    @Column(name = "date_creation", nullable = false)
    private LocalDate dateCreation;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "region", nullable = false)
    private Region region;

    @Column(name = "autre_region")
    private String autreRegion;

    @Enumerated(EnumType.STRING)
    @Column(name = "departement_dakar")
    private DAKAR departementDakar;

    @Enumerated(EnumType.STRING)
    @Column(name = "departement_diourbel")
    private DIOURBEL departementDiourbel;

    @Enumerated(EnumType.STRING)
    @Column(name = "departement_fatick")
    private FATICK departementFatick;

    @Enumerated(EnumType.STRING)
    @Column(name = "departement_kaffrine")
    private KAFFRINE departementKaffrine;

    @Enumerated(EnumType.STRING)
    @Column(name = "departement_kaolack")
    private KAOLACK departementKaolack;

    @Enumerated(EnumType.STRING)
    @Column(name = "departement_kedougou")
    private KEDOUGOU departementKedougou;

    @Enumerated(EnumType.STRING)
    @Column(name = "departement_kolda")
    private KOLDA departementKolda;

    @Enumerated(EnumType.STRING)
    @Column(name = "departement_louga")
    private LOUGA departementLouga;

    @Enumerated(EnumType.STRING)
    @Column(name = "departement_matam")
    private MATAM departementMatam;

    @Enumerated(EnumType.STRING)
    @Column(name = "departement_saint")
    private SAINTLOUIS departementSaint;

    @Enumerated(EnumType.STRING)
    @Column(name = "departement_sedhiou")
    private SEDHIOU departementSedhiou;

    @Enumerated(EnumType.STRING)
    @Column(name = "departement_tambacounda")
    private TAMBACOUNDA departementTambacounda;

    @Enumerated(EnumType.STRING)
    @Column(name = "departement_this")
    private THIES departementThis;

    @Enumerated(EnumType.STRING)
    @Column(name = "departement_ziguinchor")
    private ZIGINCHOR departementZiguinchor;

    @Column(name = "autredepartement_dakar")
    private String autredepartementDakar;

    @Column(name = "autredepartement_diourbel")
    private String autredepartementDiourbel;

    @Column(name = "autredepartement_fatick")
    private String autredepartementFatick;

    @Column(name = "autredepartement_kaffrine")
    private String autredepartementKaffrine;

    @Column(name = "autredepartement_kaolack")
    private String autredepartementKaolack;

    @Column(name = "autredepartement_kedougou")
    private String autredepartementKedougou;

    @Column(name = "autredepartement_kolda")
    private String autredepartementKolda;

    @Column(name = "autredepartement_louga")
    private String autredepartementLouga;

    @Column(name = "autredepartement_matam")
    private String autredepartementMatam;

    @Column(name = "autredepartement_saint")
    private String autredepartementSaint;

    @Column(name = "autredepartement_sedhiou")
    private String autredepartementSedhiou;

    @Column(name = "autredepartement_tambacounda")
    private String autredepartementTambacounda;

    @Column(name = "autredepartement_this")
    private String autredepartementThis;

    @Column(name = "autredepartement_ziguinchor")
    private String autredepartementZiguinchor;

    @NotNull
    @Column(name = "commune", nullable = false)
    private String commune;

    @NotNull
    @Column(name = "ia", nullable = false)
    private String ia;

    @JsonIgnoreProperties(
        value = {
            "user",
            "nomLycee",
            "personnelAdmiistratifs",
            "partenaires",
            "besoins",
            "organes",
            "visites",
            "difficultes",
            "enseignants",
            "personnelAppuis",
        },
        allowSetters = true
    )
    @OneToOne
    @JoinColumn(unique = true)
    private Proviseur proviseur;

    @JsonIgnoreProperties(
        value = {
            "concours",
            "formations",
            "examen",
            "recettes",
            "depenses",
            "visites",
            "organes",
            "mouvementMatieres",
            "partenaires",
            "besoins",
            "personnelAdmiistratifs",
            "personnelAppuis",
            "series",
            "filieres",
            "salles",
            "apprenants",
            "enseignants",
            "difficultes",
            "niveaucalifications",
            "reformeMatieres",
            "iventaireDesMatetieres",
            "programmes",
            "niveauetudes",
            "lyceeTechnique",
            "proviseur",
            "directeurEtude",
            "comptableFinancie",
            "comptableMatiere",
        },
        allowSetters = true
    )
    @OneToOne
    @JoinColumn(unique = true)
    private LyceesTechniques nomLycee;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LyceeTechnique id(Long id) {
        this.id = id;
        return this;
    }

    public String getPrenomNom() {
        return this.prenomNom;
    }

    public LyceeTechnique prenomNom(String prenomNom) {
        this.prenomNom = prenomNom;
        return this;
    }

    public void setPrenomNom(String prenomNom) {
        this.prenomNom = prenomNom;
    }

    public String getAdresse() {
        return this.adresse;
    }

    public LyceeTechnique adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getMail() {
        return this.mail;
    }

    public LyceeTechnique mail(String mail) {
        this.mail = mail;
        return this;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getTel1() {
        return this.tel1;
    }

    public LyceeTechnique tel1(String tel1) {
        this.tel1 = tel1;
        return this;
    }

    public void setTel1(String tel1) {
        this.tel1 = tel1;
    }

    public String getTel2() {
        return this.tel2;
    }

    public LyceeTechnique tel2(String tel2) {
        this.tel2 = tel2;
        return this;
    }

    public void setTel2(String tel2) {
        this.tel2 = tel2;
    }

    public String getBoitePostal() {
        return this.boitePostal;
    }

    public LyceeTechnique boitePostal(String boitePostal) {
        this.boitePostal = boitePostal;
        return this;
    }

    public void setBoitePostal(String boitePostal) {
        this.boitePostal = boitePostal;
    }

    public String getDecretCreation() {
        return this.decretCreation;
    }

    public LyceeTechnique decretCreation(String decretCreation) {
        this.decretCreation = decretCreation;
        return this;
    }

    public void setDecretCreation(String decretCreation) {
        this.decretCreation = decretCreation;
    }

    public LocalDate getDateCreation() {
        return this.dateCreation;
    }

    public LyceeTechnique dateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
        return this;
    }

    public void setDateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Region getRegion() {
        return this.region;
    }

    public LyceeTechnique region(Region region) {
        this.region = region;
        return this;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public String getAutreRegion() {
        return this.autreRegion;
    }

    public LyceeTechnique autreRegion(String autreRegion) {
        this.autreRegion = autreRegion;
        return this;
    }

    public void setAutreRegion(String autreRegion) {
        this.autreRegion = autreRegion;
    }

    public DAKAR getDepartementDakar() {
        return this.departementDakar;
    }

    public LyceeTechnique departementDakar(DAKAR departementDakar) {
        this.departementDakar = departementDakar;
        return this;
    }

    public void setDepartementDakar(DAKAR departementDakar) {
        this.departementDakar = departementDakar;
    }

    public DIOURBEL getDepartementDiourbel() {
        return this.departementDiourbel;
    }

    public LyceeTechnique departementDiourbel(DIOURBEL departementDiourbel) {
        this.departementDiourbel = departementDiourbel;
        return this;
    }

    public void setDepartementDiourbel(DIOURBEL departementDiourbel) {
        this.departementDiourbel = departementDiourbel;
    }

    public FATICK getDepartementFatick() {
        return this.departementFatick;
    }

    public LyceeTechnique departementFatick(FATICK departementFatick) {
        this.departementFatick = departementFatick;
        return this;
    }

    public void setDepartementFatick(FATICK departementFatick) {
        this.departementFatick = departementFatick;
    }

    public KAFFRINE getDepartementKaffrine() {
        return this.departementKaffrine;
    }

    public LyceeTechnique departementKaffrine(KAFFRINE departementKaffrine) {
        this.departementKaffrine = departementKaffrine;
        return this;
    }

    public void setDepartementKaffrine(KAFFRINE departementKaffrine) {
        this.departementKaffrine = departementKaffrine;
    }

    public KAOLACK getDepartementKaolack() {
        return this.departementKaolack;
    }

    public LyceeTechnique departementKaolack(KAOLACK departementKaolack) {
        this.departementKaolack = departementKaolack;
        return this;
    }

    public void setDepartementKaolack(KAOLACK departementKaolack) {
        this.departementKaolack = departementKaolack;
    }

    public KEDOUGOU getDepartementKedougou() {
        return this.departementKedougou;
    }

    public LyceeTechnique departementKedougou(KEDOUGOU departementKedougou) {
        this.departementKedougou = departementKedougou;
        return this;
    }

    public void setDepartementKedougou(KEDOUGOU departementKedougou) {
        this.departementKedougou = departementKedougou;
    }

    public KOLDA getDepartementKolda() {
        return this.departementKolda;
    }

    public LyceeTechnique departementKolda(KOLDA departementKolda) {
        this.departementKolda = departementKolda;
        return this;
    }

    public void setDepartementKolda(KOLDA departementKolda) {
        this.departementKolda = departementKolda;
    }

    public LOUGA getDepartementLouga() {
        return this.departementLouga;
    }

    public LyceeTechnique departementLouga(LOUGA departementLouga) {
        this.departementLouga = departementLouga;
        return this;
    }

    public void setDepartementLouga(LOUGA departementLouga) {
        this.departementLouga = departementLouga;
    }

    public MATAM getDepartementMatam() {
        return this.departementMatam;
    }

    public LyceeTechnique departementMatam(MATAM departementMatam) {
        this.departementMatam = departementMatam;
        return this;
    }

    public void setDepartementMatam(MATAM departementMatam) {
        this.departementMatam = departementMatam;
    }

    public SAINTLOUIS getDepartementSaint() {
        return this.departementSaint;
    }

    public LyceeTechnique departementSaint(SAINTLOUIS departementSaint) {
        this.departementSaint = departementSaint;
        return this;
    }

    public void setDepartementSaint(SAINTLOUIS departementSaint) {
        this.departementSaint = departementSaint;
    }

    public SEDHIOU getDepartementSedhiou() {
        return this.departementSedhiou;
    }

    public LyceeTechnique departementSedhiou(SEDHIOU departementSedhiou) {
        this.departementSedhiou = departementSedhiou;
        return this;
    }

    public void setDepartementSedhiou(SEDHIOU departementSedhiou) {
        this.departementSedhiou = departementSedhiou;
    }

    public TAMBACOUNDA getDepartementTambacounda() {
        return this.departementTambacounda;
    }

    public LyceeTechnique departementTambacounda(TAMBACOUNDA departementTambacounda) {
        this.departementTambacounda = departementTambacounda;
        return this;
    }

    public void setDepartementTambacounda(TAMBACOUNDA departementTambacounda) {
        this.departementTambacounda = departementTambacounda;
    }

    public THIES getDepartementThis() {
        return this.departementThis;
    }

    public LyceeTechnique departementThis(THIES departementThis) {
        this.departementThis = departementThis;
        return this;
    }

    public void setDepartementThis(THIES departementThis) {
        this.departementThis = departementThis;
    }

    public ZIGINCHOR getDepartementZiguinchor() {
        return this.departementZiguinchor;
    }

    public LyceeTechnique departementZiguinchor(ZIGINCHOR departementZiguinchor) {
        this.departementZiguinchor = departementZiguinchor;
        return this;
    }

    public void setDepartementZiguinchor(ZIGINCHOR departementZiguinchor) {
        this.departementZiguinchor = departementZiguinchor;
    }

    public String getAutredepartementDakar() {
        return this.autredepartementDakar;
    }

    public LyceeTechnique autredepartementDakar(String autredepartementDakar) {
        this.autredepartementDakar = autredepartementDakar;
        return this;
    }

    public void setAutredepartementDakar(String autredepartementDakar) {
        this.autredepartementDakar = autredepartementDakar;
    }

    public String getAutredepartementDiourbel() {
        return this.autredepartementDiourbel;
    }

    public LyceeTechnique autredepartementDiourbel(String autredepartementDiourbel) {
        this.autredepartementDiourbel = autredepartementDiourbel;
        return this;
    }

    public void setAutredepartementDiourbel(String autredepartementDiourbel) {
        this.autredepartementDiourbel = autredepartementDiourbel;
    }

    public String getAutredepartementFatick() {
        return this.autredepartementFatick;
    }

    public LyceeTechnique autredepartementFatick(String autredepartementFatick) {
        this.autredepartementFatick = autredepartementFatick;
        return this;
    }

    public void setAutredepartementFatick(String autredepartementFatick) {
        this.autredepartementFatick = autredepartementFatick;
    }

    public String getAutredepartementKaffrine() {
        return this.autredepartementKaffrine;
    }

    public LyceeTechnique autredepartementKaffrine(String autredepartementKaffrine) {
        this.autredepartementKaffrine = autredepartementKaffrine;
        return this;
    }

    public void setAutredepartementKaffrine(String autredepartementKaffrine) {
        this.autredepartementKaffrine = autredepartementKaffrine;
    }

    public String getAutredepartementKaolack() {
        return this.autredepartementKaolack;
    }

    public LyceeTechnique autredepartementKaolack(String autredepartementKaolack) {
        this.autredepartementKaolack = autredepartementKaolack;
        return this;
    }

    public void setAutredepartementKaolack(String autredepartementKaolack) {
        this.autredepartementKaolack = autredepartementKaolack;
    }

    public String getAutredepartementKedougou() {
        return this.autredepartementKedougou;
    }

    public LyceeTechnique autredepartementKedougou(String autredepartementKedougou) {
        this.autredepartementKedougou = autredepartementKedougou;
        return this;
    }

    public void setAutredepartementKedougou(String autredepartementKedougou) {
        this.autredepartementKedougou = autredepartementKedougou;
    }

    public String getAutredepartementKolda() {
        return this.autredepartementKolda;
    }

    public LyceeTechnique autredepartementKolda(String autredepartementKolda) {
        this.autredepartementKolda = autredepartementKolda;
        return this;
    }

    public void setAutredepartementKolda(String autredepartementKolda) {
        this.autredepartementKolda = autredepartementKolda;
    }

    public String getAutredepartementLouga() {
        return this.autredepartementLouga;
    }

    public LyceeTechnique autredepartementLouga(String autredepartementLouga) {
        this.autredepartementLouga = autredepartementLouga;
        return this;
    }

    public void setAutredepartementLouga(String autredepartementLouga) {
        this.autredepartementLouga = autredepartementLouga;
    }

    public String getAutredepartementMatam() {
        return this.autredepartementMatam;
    }

    public LyceeTechnique autredepartementMatam(String autredepartementMatam) {
        this.autredepartementMatam = autredepartementMatam;
        return this;
    }

    public void setAutredepartementMatam(String autredepartementMatam) {
        this.autredepartementMatam = autredepartementMatam;
    }

    public String getAutredepartementSaint() {
        return this.autredepartementSaint;
    }

    public LyceeTechnique autredepartementSaint(String autredepartementSaint) {
        this.autredepartementSaint = autredepartementSaint;
        return this;
    }

    public void setAutredepartementSaint(String autredepartementSaint) {
        this.autredepartementSaint = autredepartementSaint;
    }

    public String getAutredepartementSedhiou() {
        return this.autredepartementSedhiou;
    }

    public LyceeTechnique autredepartementSedhiou(String autredepartementSedhiou) {
        this.autredepartementSedhiou = autredepartementSedhiou;
        return this;
    }

    public void setAutredepartementSedhiou(String autredepartementSedhiou) {
        this.autredepartementSedhiou = autredepartementSedhiou;
    }

    public String getAutredepartementTambacounda() {
        return this.autredepartementTambacounda;
    }

    public LyceeTechnique autredepartementTambacounda(String autredepartementTambacounda) {
        this.autredepartementTambacounda = autredepartementTambacounda;
        return this;
    }

    public void setAutredepartementTambacounda(String autredepartementTambacounda) {
        this.autredepartementTambacounda = autredepartementTambacounda;
    }

    public String getAutredepartementThis() {
        return this.autredepartementThis;
    }

    public LyceeTechnique autredepartementThis(String autredepartementThis) {
        this.autredepartementThis = autredepartementThis;
        return this;
    }

    public void setAutredepartementThis(String autredepartementThis) {
        this.autredepartementThis = autredepartementThis;
    }

    public String getAutredepartementZiguinchor() {
        return this.autredepartementZiguinchor;
    }

    public LyceeTechnique autredepartementZiguinchor(String autredepartementZiguinchor) {
        this.autredepartementZiguinchor = autredepartementZiguinchor;
        return this;
    }

    public void setAutredepartementZiguinchor(String autredepartementZiguinchor) {
        this.autredepartementZiguinchor = autredepartementZiguinchor;
    }

    public String getCommune() {
        return this.commune;
    }

    public LyceeTechnique commune(String commune) {
        this.commune = commune;
        return this;
    }

    public void setCommune(String commune) {
        this.commune = commune;
    }

    public String getIa() {
        return this.ia;
    }

    public LyceeTechnique ia(String ia) {
        this.ia = ia;
        return this;
    }

    public void setIa(String ia) {
        this.ia = ia;
    }

    public Proviseur getProviseur() {
        return this.proviseur;
    }

    public LyceeTechnique proviseur(Proviseur proviseur) {
        this.setProviseur(proviseur);
        return this;
    }

    public void setProviseur(Proviseur proviseur) {
        this.proviseur = proviseur;
    }

    public LyceesTechniques getNomLycee() {
        return this.nomLycee;
    }

    public LyceeTechnique nomLycee(LyceesTechniques lyceesTechniques) {
        this.setNomLycee(lyceesTechniques);
        return this;
    }

    public void setNomLycee(LyceesTechniques lyceesTechniques) {
        this.nomLycee = lyceesTechniques;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LyceeTechnique)) {
            return false;
        }
        return id != null && id.equals(((LyceeTechnique) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LyceeTechnique{" +
            "id=" + getId() +
            ", prenomNom='" + getPrenomNom() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", mail='" + getMail() + "'" +
            ", tel1='" + getTel1() + "'" +
            ", tel2='" + getTel2() + "'" +
            ", boitePostal='" + getBoitePostal() + "'" +
            ", decretCreation='" + getDecretCreation() + "'" +
            ", dateCreation='" + getDateCreation() + "'" +
            ", region='" + getRegion() + "'" +
            ", autreRegion='" + getAutreRegion() + "'" +
            ", departementDakar='" + getDepartementDakar() + "'" +
            ", departementDiourbel='" + getDepartementDiourbel() + "'" +
            ", departementFatick='" + getDepartementFatick() + "'" +
            ", departementKaffrine='" + getDepartementKaffrine() + "'" +
            ", departementKaolack='" + getDepartementKaolack() + "'" +
            ", departementKedougou='" + getDepartementKedougou() + "'" +
            ", departementKolda='" + getDepartementKolda() + "'" +
            ", departementLouga='" + getDepartementLouga() + "'" +
            ", departementMatam='" + getDepartementMatam() + "'" +
            ", departementSaint='" + getDepartementSaint() + "'" +
            ", departementSedhiou='" + getDepartementSedhiou() + "'" +
            ", departementTambacounda='" + getDepartementTambacounda() + "'" +
            ", departementThis='" + getDepartementThis() + "'" +
            ", departementZiguinchor='" + getDepartementZiguinchor() + "'" +
            ", autredepartementDakar='" + getAutredepartementDakar() + "'" +
            ", autredepartementDiourbel='" + getAutredepartementDiourbel() + "'" +
            ", autredepartementFatick='" + getAutredepartementFatick() + "'" +
            ", autredepartementKaffrine='" + getAutredepartementKaffrine() + "'" +
            ", autredepartementKaolack='" + getAutredepartementKaolack() + "'" +
            ", autredepartementKedougou='" + getAutredepartementKedougou() + "'" +
            ", autredepartementKolda='" + getAutredepartementKolda() + "'" +
            ", autredepartementLouga='" + getAutredepartementLouga() + "'" +
            ", autredepartementMatam='" + getAutredepartementMatam() + "'" +
            ", autredepartementSaint='" + getAutredepartementSaint() + "'" +
            ", autredepartementSedhiou='" + getAutredepartementSedhiou() + "'" +
            ", autredepartementTambacounda='" + getAutredepartementTambacounda() + "'" +
            ", autredepartementThis='" + getAutredepartementThis() + "'" +
            ", autredepartementZiguinchor='" + getAutredepartementZiguinchor() + "'" +
            ", commune='" + getCommune() + "'" +
            ", ia='" + getIa() + "'" +
            "}";
    }
}
