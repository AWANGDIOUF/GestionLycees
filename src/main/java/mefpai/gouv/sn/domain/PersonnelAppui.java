package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import mefpai.gouv.sn.domain.enumeration.FonctionPersApp;
import mefpai.gouv.sn.domain.enumeration.Situation;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PersonnelAppui.
 */
@Entity
@Table(name = "personnel_appui")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PersonnelAppui implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
    private FonctionPersApp fonction;

    @Column(name = "autre_foction")
    private String autreFoction;

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
    private Proviseur directeur;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PersonnelAppui id(Long id) {
        this.id = id;
        return this;
    }

    public String getNom() {
        return this.nom;
    }

    public PersonnelAppui nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return this.prenom;
    }

    public PersonnelAppui prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Situation getSituationMatrimoniale() {
        return this.situationMatrimoniale;
    }

    public PersonnelAppui situationMatrimoniale(Situation situationMatrimoniale) {
        this.situationMatrimoniale = situationMatrimoniale;
        return this;
    }

    public void setSituationMatrimoniale(Situation situationMatrimoniale) {
        this.situationMatrimoniale = situationMatrimoniale;
    }

    public FonctionPersApp getFonction() {
        return this.fonction;
    }

    public PersonnelAppui fonction(FonctionPersApp fonction) {
        this.fonction = fonction;
        return this;
    }

    public void setFonction(FonctionPersApp fonction) {
        this.fonction = fonction;
    }

    public String getAutreFoction() {
        return this.autreFoction;
    }

    public PersonnelAppui autreFoction(String autreFoction) {
        this.autreFoction = autreFoction;
        return this;
    }

    public void setAutreFoction(String autreFoction) {
        this.autreFoction = autreFoction;
    }

    public String getTelephone() {
        return this.telephone;
    }

    public PersonnelAppui telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getMail() {
        return this.mail;
    }

    public PersonnelAppui mail(String mail) {
        this.mail = mail;
        return this;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public PersonnelAppui lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public Proviseur getDirecteur() {
        return this.directeur;
    }

    public PersonnelAppui directeur(Proviseur proviseur) {
        this.setDirecteur(proviseur);
        return this;
    }

    public void setDirecteur(Proviseur proviseur) {
        this.directeur = proviseur;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PersonnelAppui)) {
            return false;
        }
        return id != null && id.equals(((PersonnelAppui) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PersonnelAppui{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", situationMatrimoniale='" + getSituationMatrimoniale() + "'" +
            ", fonction='" + getFonction() + "'" +
            ", autreFoction='" + getAutreFoction() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", mail='" + getMail() + "'" +
            "}";
    }
}
