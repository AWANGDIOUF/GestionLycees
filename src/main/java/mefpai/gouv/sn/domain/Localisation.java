package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
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
 * A Localisation.
 */
@Entity
@Table(name = "localisation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Localisation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "region")
    private Region region;

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
    @Column(name = "departement_zic")
    private ZIGINCHOR departementZic;

    @Column(name = "ia")
    private String ia;

    @ManyToOne
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
    private LyceesTechniques lyceesTechniques;

    @ManyToOne
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
    private Proviseur proviseur;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Localisation id(Long id) {
        this.id = id;
        return this;
    }

    public Region getRegion() {
        return this.region;
    }

    public Localisation region(Region region) {
        this.region = region;
        return this;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public DAKAR getDepartementDakar() {
        return this.departementDakar;
    }

    public Localisation departementDakar(DAKAR departementDakar) {
        this.departementDakar = departementDakar;
        return this;
    }

    public void setDepartementDakar(DAKAR departementDakar) {
        this.departementDakar = departementDakar;
    }

    public DIOURBEL getDepartementDiourbel() {
        return this.departementDiourbel;
    }

    public Localisation departementDiourbel(DIOURBEL departementDiourbel) {
        this.departementDiourbel = departementDiourbel;
        return this;
    }

    public void setDepartementDiourbel(DIOURBEL departementDiourbel) {
        this.departementDiourbel = departementDiourbel;
    }

    public FATICK getDepartementFatick() {
        return this.departementFatick;
    }

    public Localisation departementFatick(FATICK departementFatick) {
        this.departementFatick = departementFatick;
        return this;
    }

    public void setDepartementFatick(FATICK departementFatick) {
        this.departementFatick = departementFatick;
    }

    public KAFFRINE getDepartementKaffrine() {
        return this.departementKaffrine;
    }

    public Localisation departementKaffrine(KAFFRINE departementKaffrine) {
        this.departementKaffrine = departementKaffrine;
        return this;
    }

    public void setDepartementKaffrine(KAFFRINE departementKaffrine) {
        this.departementKaffrine = departementKaffrine;
    }

    public KAOLACK getDepartementKaolack() {
        return this.departementKaolack;
    }

    public Localisation departementKaolack(KAOLACK departementKaolack) {
        this.departementKaolack = departementKaolack;
        return this;
    }

    public void setDepartementKaolack(KAOLACK departementKaolack) {
        this.departementKaolack = departementKaolack;
    }

    public KEDOUGOU getDepartementKedougou() {
        return this.departementKedougou;
    }

    public Localisation departementKedougou(KEDOUGOU departementKedougou) {
        this.departementKedougou = departementKedougou;
        return this;
    }

    public void setDepartementKedougou(KEDOUGOU departementKedougou) {
        this.departementKedougou = departementKedougou;
    }

    public KOLDA getDepartementKolda() {
        return this.departementKolda;
    }

    public Localisation departementKolda(KOLDA departementKolda) {
        this.departementKolda = departementKolda;
        return this;
    }

    public void setDepartementKolda(KOLDA departementKolda) {
        this.departementKolda = departementKolda;
    }

    public LOUGA getDepartementLouga() {
        return this.departementLouga;
    }

    public Localisation departementLouga(LOUGA departementLouga) {
        this.departementLouga = departementLouga;
        return this;
    }

    public void setDepartementLouga(LOUGA departementLouga) {
        this.departementLouga = departementLouga;
    }

    public MATAM getDepartementMatam() {
        return this.departementMatam;
    }

    public Localisation departementMatam(MATAM departementMatam) {
        this.departementMatam = departementMatam;
        return this;
    }

    public void setDepartementMatam(MATAM departementMatam) {
        this.departementMatam = departementMatam;
    }

    public SAINTLOUIS getDepartementSaint() {
        return this.departementSaint;
    }

    public Localisation departementSaint(SAINTLOUIS departementSaint) {
        this.departementSaint = departementSaint;
        return this;
    }

    public void setDepartementSaint(SAINTLOUIS departementSaint) {
        this.departementSaint = departementSaint;
    }

    public SEDHIOU getDepartementSedhiou() {
        return this.departementSedhiou;
    }

    public Localisation departementSedhiou(SEDHIOU departementSedhiou) {
        this.departementSedhiou = departementSedhiou;
        return this;
    }

    public void setDepartementSedhiou(SEDHIOU departementSedhiou) {
        this.departementSedhiou = departementSedhiou;
    }

    public TAMBACOUNDA getDepartementTambacounda() {
        return this.departementTambacounda;
    }

    public Localisation departementTambacounda(TAMBACOUNDA departementTambacounda) {
        this.departementTambacounda = departementTambacounda;
        return this;
    }

    public void setDepartementTambacounda(TAMBACOUNDA departementTambacounda) {
        this.departementTambacounda = departementTambacounda;
    }

    public THIES getDepartementThis() {
        return this.departementThis;
    }

    public Localisation departementThis(THIES departementThis) {
        this.departementThis = departementThis;
        return this;
    }

    public void setDepartementThis(THIES departementThis) {
        this.departementThis = departementThis;
    }

    public ZIGINCHOR getDepartementZic() {
        return this.departementZic;
    }

    public Localisation departementZic(ZIGINCHOR departementZic) {
        this.departementZic = departementZic;
        return this;
    }

    public void setDepartementZic(ZIGINCHOR departementZic) {
        this.departementZic = departementZic;
    }

    public String getIa() {
        return this.ia;
    }

    public Localisation ia(String ia) {
        this.ia = ia;
        return this;
    }

    public void setIa(String ia) {
        this.ia = ia;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public Localisation lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public Proviseur getProviseur() {
        return this.proviseur;
    }

    public Localisation proviseur(Proviseur proviseur) {
        this.setProviseur(proviseur);
        return this;
    }

    public void setProviseur(Proviseur proviseur) {
        this.proviseur = proviseur;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Localisation)) {
            return false;
        }
        return id != null && id.equals(((Localisation) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Localisation{" +
            "id=" + getId() +
            ", region='" + getRegion() + "'" +
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
            ", departementZic='" + getDepartementZic() + "'" +
            ", ia='" + getIa() + "'" +
            "}";
    }
}
