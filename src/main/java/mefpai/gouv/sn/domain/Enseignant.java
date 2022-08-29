package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import mefpai.gouv.sn.domain.enumeration.Genre;
import mefpai.gouv.sn.domain.enumeration.Option;
import mefpai.gouv.sn.domain.enumeration.Situation;
import mefpai.gouv.sn.domain.enumeration.StatusEns;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Enseignant.
 */
@Entity
@Table(name = "enseignant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Enseignant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "matricule_ens", nullable = false)
    private String matriculeEns;

    @NotNull
    @Column(name = "nom_prenom", nullable = false)
    private String nomPrenom;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "sexe", nullable = false)
    private Genre sexe;

    @NotNull
    @Column(name = "telephone", nullable = false)
    private String telephone;

    @NotNull
    @Column(name = "mail", nullable = false, unique = true)
    private String mail;

    @NotNull
    @Column(name = "grade", nullable = false)
    private String grade;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_option")
    private Option option;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "situation_matrimoniale", nullable = false)
    private Situation situationMatrimoniale;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusEns status;

    @NotNull
    @Column(name = "fonction", nullable = false)
    private String fonction;

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
    @JsonIgnoreProperties(value = { "enseignants", "niveaus", "examen", "lyceesTechniques", "directeur" }, allowSetters = true)
    private Serie serie;

    @ManyToOne
    @JsonIgnoreProperties(value = { "enseignants", "programmes", "examen", "lyceesTechniques", "directeur" }, allowSetters = true)
    private Filiere filiere;

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

    public Enseignant id(Long id) {
        this.id = id;
        return this;
    }

    public String getMatriculeEns() {
        return this.matriculeEns;
    }

    public Enseignant matriculeEns(String matriculeEns) {
        this.matriculeEns = matriculeEns;
        return this;
    }

    public void setMatriculeEns(String matriculeEns) {
        this.matriculeEns = matriculeEns;
    }

    public String getNomPrenom() {
        return this.nomPrenom;
    }

    public Enseignant nomPrenom(String nomPrenom) {
        this.nomPrenom = nomPrenom;
        return this;
    }

    public void setNomPrenom(String nomPrenom) {
        this.nomPrenom = nomPrenom;
    }

    public Genre getSexe() {
        return this.sexe;
    }

    public Enseignant sexe(Genre sexe) {
        this.sexe = sexe;
        return this;
    }

    public void setSexe(Genre sexe) {
        this.sexe = sexe;
    }

    public String getTelephone() {
        return this.telephone;
    }

    public Enseignant telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getMail() {
        return this.mail;
    }

    public Enseignant mail(String mail) {
        this.mail = mail;
        return this;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getGrade() {
        return this.grade;
    }

    public Enseignant grade(String grade) {
        this.grade = grade;
        return this;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public Option getOption() {
        return this.option;
    }

    public Enseignant option(Option option) {
        this.option = option;
        return this;
    }

    public void setOption(Option option) {
        this.option = option;
    }

    public Situation getSituationMatrimoniale() {
        return this.situationMatrimoniale;
    }

    public Enseignant situationMatrimoniale(Situation situationMatrimoniale) {
        this.situationMatrimoniale = situationMatrimoniale;
        return this;
    }

    public void setSituationMatrimoniale(Situation situationMatrimoniale) {
        this.situationMatrimoniale = situationMatrimoniale;
    }

    public StatusEns getStatus() {
        return this.status;
    }

    public Enseignant status(StatusEns status) {
        this.status = status;
        return this;
    }

    public void setStatus(StatusEns status) {
        this.status = status;
    }

    public String getFonction() {
        return this.fonction;
    }

    public Enseignant fonction(String fonction) {
        this.fonction = fonction;
        return this;
    }

    public void setFonction(String fonction) {
        this.fonction = fonction;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public Enseignant lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public Serie getSerie() {
        return this.serie;
    }

    public Enseignant serie(Serie serie) {
        this.setSerie(serie);
        return this;
    }

    public void setSerie(Serie serie) {
        this.serie = serie;
    }

    public Filiere getFiliere() {
        return this.filiere;
    }

    public Enseignant filiere(Filiere filiere) {
        this.setFiliere(filiere);
        return this;
    }

    public void setFiliere(Filiere filiere) {
        this.filiere = filiere;
    }

    public Proviseur getProviseur() {
        return this.proviseur;
    }

    public Enseignant proviseur(Proviseur proviseur) {
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
        if (!(o instanceof Enseignant)) {
            return false;
        }
        return id != null && id.equals(((Enseignant) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Enseignant{" +
            "id=" + getId() +
            ", matriculeEns='" + getMatriculeEns() + "'" +
            ", nomPrenom='" + getNomPrenom() + "'" +
            ", sexe='" + getSexe() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", mail='" + getMail() + "'" +
            ", grade='" + getGrade() + "'" +
            ", option='" + getOption() + "'" +
            ", situationMatrimoniale='" + getSituationMatrimoniale() + "'" +
            ", status='" + getStatus() + "'" +
            ", fonction='" + getFonction() + "'" +
            "}";
    }
}
