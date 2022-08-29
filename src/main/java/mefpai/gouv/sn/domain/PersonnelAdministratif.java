package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import mefpai.gouv.sn.domain.enumeration.FonctionPersAd;
import mefpai.gouv.sn.domain.enumeration.Situation;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PersonnelAdministratif.
 */
@Entity
@Table(name = "personnel_administratif")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PersonnelAdministratif implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "matricule", nullable = false)
    private String matricule;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "situation_matrimoniale", nullable = false)
    private Situation situationMatrimoniale;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "fonction", nullable = false)
    private FonctionPersAd fonction;

    @Column(name = "autre_fonction")
    private String autreFonction;

    @NotNull
    @Column(name = "telephone", nullable = false)
    private String telephone;

    @NotNull
    @Column(name = "mail", nullable = false)
    private String mail;

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

    public PersonnelAdministratif id(Long id) {
        this.id = id;
        return this;
    }

    public String getMatricule() {
        return this.matricule;
    }

    public PersonnelAdministratif matricule(String matricule) {
        this.matricule = matricule;
        return this;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getNom() {
        return this.nom;
    }

    public PersonnelAdministratif nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return this.prenom;
    }

    public PersonnelAdministratif prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Situation getSituationMatrimoniale() {
        return this.situationMatrimoniale;
    }

    public PersonnelAdministratif situationMatrimoniale(Situation situationMatrimoniale) {
        this.situationMatrimoniale = situationMatrimoniale;
        return this;
    }

    public void setSituationMatrimoniale(Situation situationMatrimoniale) {
        this.situationMatrimoniale = situationMatrimoniale;
    }

    public FonctionPersAd getFonction() {
        return this.fonction;
    }

    public PersonnelAdministratif fonction(FonctionPersAd fonction) {
        this.fonction = fonction;
        return this;
    }

    public void setFonction(FonctionPersAd fonction) {
        this.fonction = fonction;
    }

    public String getAutreFonction() {
        return this.autreFonction;
    }

    public PersonnelAdministratif autreFonction(String autreFonction) {
        this.autreFonction = autreFonction;
        return this;
    }

    public void setAutreFonction(String autreFonction) {
        this.autreFonction = autreFonction;
    }

    public String getTelephone() {
        return this.telephone;
    }

    public PersonnelAdministratif telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getMail() {
        return this.mail;
    }

    public PersonnelAdministratif mail(String mail) {
        this.mail = mail;
        return this;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public PersonnelAdministratif lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public Proviseur getProviseur() {
        return this.proviseur;
    }

    public PersonnelAdministratif proviseur(Proviseur proviseur) {
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
        if (!(o instanceof PersonnelAdministratif)) {
            return false;
        }
        return id != null && id.equals(((PersonnelAdministratif) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PersonnelAdministratif{" +
            "id=" + getId() +
            ", matricule='" + getMatricule() + "'" +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", situationMatrimoniale='" + getSituationMatrimoniale() + "'" +
            ", fonction='" + getFonction() + "'" +
            ", autreFonction='" + getAutreFonction() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", mail='" + getMail() + "'" +
            "}";
    }
}
