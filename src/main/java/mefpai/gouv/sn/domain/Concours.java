package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Concours.
 */
@Entity
@Table(name = "concours")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Concours implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom_concours")
    private String nomConcours;

    @Column(name = "date_ouverture")
    private LocalDate dateOuverture;

    @Column(name = "date_cloture")
    private LocalDate dateCloture;

    @Column(name = "nbre_candidats")
    private Long nbreCandidats;

    @Column(name = "date_concours")
    private LocalDate dateConcours;

    @Column(name = "date_deliberation")
    private LocalDate dateDeliberation;

    @Column(name = "nbre_admis")
    private Long nbreAdmis;

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
            "concours",
            "formations",
            "salles",
            "series",
            "niveaus",
            "filieres",
            "programmes",
            "niveauCalifications",
            "apprenants",
            "examen",
        },
        allowSetters = true
    )
    private DirecteurEtude directeur;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Concours id(Long id) {
        this.id = id;
        return this;
    }

    public String getNomConcours() {
        return this.nomConcours;
    }

    public Concours nomConcours(String nomConcours) {
        this.nomConcours = nomConcours;
        return this;
    }

    public void setNomConcours(String nomConcours) {
        this.nomConcours = nomConcours;
    }

    public LocalDate getDateOuverture() {
        return this.dateOuverture;
    }

    public Concours dateOuverture(LocalDate dateOuverture) {
        this.dateOuverture = dateOuverture;
        return this;
    }

    public void setDateOuverture(LocalDate dateOuverture) {
        this.dateOuverture = dateOuverture;
    }

    public LocalDate getDateCloture() {
        return this.dateCloture;
    }

    public Concours dateCloture(LocalDate dateCloture) {
        this.dateCloture = dateCloture;
        return this;
    }

    public void setDateCloture(LocalDate dateCloture) {
        this.dateCloture = dateCloture;
    }

    public Long getNbreCandidats() {
        return this.nbreCandidats;
    }

    public Concours nbreCandidats(Long nbreCandidats) {
        this.nbreCandidats = nbreCandidats;
        return this;
    }

    public void setNbreCandidats(Long nbreCandidats) {
        this.nbreCandidats = nbreCandidats;
    }

    public LocalDate getDateConcours() {
        return this.dateConcours;
    }

    public Concours dateConcours(LocalDate dateConcours) {
        this.dateConcours = dateConcours;
        return this;
    }

    public void setDateConcours(LocalDate dateConcours) {
        this.dateConcours = dateConcours;
    }

    public LocalDate getDateDeliberation() {
        return this.dateDeliberation;
    }

    public Concours dateDeliberation(LocalDate dateDeliberation) {
        this.dateDeliberation = dateDeliberation;
        return this;
    }

    public void setDateDeliberation(LocalDate dateDeliberation) {
        this.dateDeliberation = dateDeliberation;
    }

    public Long getNbreAdmis() {
        return this.nbreAdmis;
    }

    public Concours nbreAdmis(Long nbreAdmis) {
        this.nbreAdmis = nbreAdmis;
        return this;
    }

    public void setNbreAdmis(Long nbreAdmis) {
        this.nbreAdmis = nbreAdmis;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public Concours lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public DirecteurEtude getDirecteur() {
        return this.directeur;
    }

    public Concours directeur(DirecteurEtude directeurEtude) {
        this.setDirecteur(directeurEtude);
        return this;
    }

    public void setDirecteur(DirecteurEtude directeurEtude) {
        this.directeur = directeurEtude;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Concours)) {
            return false;
        }
        return id != null && id.equals(((Concours) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Concours{" +
            "id=" + getId() +
            ", nomConcours='" + getNomConcours() + "'" +
            ", dateOuverture='" + getDateOuverture() + "'" +
            ", dateCloture='" + getDateCloture() + "'" +
            ", nbreCandidats=" + getNbreCandidats() +
            ", dateConcours='" + getDateConcours() + "'" +
            ", dateDeliberation='" + getDateDeliberation() + "'" +
            ", nbreAdmis=" + getNbreAdmis() +
            "}";
    }
}
