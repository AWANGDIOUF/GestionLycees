package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A NiveauxCalification.
 */
@Entity
@Table(name = "niveaux_calification")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NiveauxCalification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "niveau_calification", nullable = false)
    private String niveauCalification;

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

    @ManyToOne
    @JsonIgnoreProperties(value = { "niveauCalifications", "lyceesTechniques", "directeur", "filiere" }, allowSetters = true)
    private Programme programme;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NiveauxCalification id(Long id) {
        this.id = id;
        return this;
    }

    public String getNiveauCalification() {
        return this.niveauCalification;
    }

    public NiveauxCalification niveauCalification(String niveauCalification) {
        this.niveauCalification = niveauCalification;
        return this;
    }

    public void setNiveauCalification(String niveauCalification) {
        this.niveauCalification = niveauCalification;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public NiveauxCalification lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public DirecteurEtude getDirecteur() {
        return this.directeur;
    }

    public NiveauxCalification directeur(DirecteurEtude directeurEtude) {
        this.setDirecteur(directeurEtude);
        return this;
    }

    public void setDirecteur(DirecteurEtude directeurEtude) {
        this.directeur = directeurEtude;
    }

    public Programme getProgramme() {
        return this.programme;
    }

    public NiveauxCalification programme(Programme programme) {
        this.setProgramme(programme);
        return this;
    }

    public void setProgramme(Programme programme) {
        this.programme = programme;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NiveauxCalification)) {
            return false;
        }
        return id != null && id.equals(((NiveauxCalification) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NiveauxCalification{" +
            "id=" + getId() +
            ", niveauCalification='" + getNiveauCalification() + "'" +
            "}";
    }
}
