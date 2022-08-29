package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A NiveauxEtudes.
 */
@Entity
@Table(name = "niveaux_etudes")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NiveauxEtudes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nom_niveau", nullable = false)
    private String nomNiveau;

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
    @JsonIgnoreProperties(value = { "enseignants", "niveaus", "examen", "lyceesTechniques", "directeur" }, allowSetters = true)
    private Serie serie;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NiveauxEtudes id(Long id) {
        this.id = id;
        return this;
    }

    public String getNomNiveau() {
        return this.nomNiveau;
    }

    public NiveauxEtudes nomNiveau(String nomNiveau) {
        this.nomNiveau = nomNiveau;
        return this;
    }

    public void setNomNiveau(String nomNiveau) {
        this.nomNiveau = nomNiveau;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public NiveauxEtudes lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public DirecteurEtude getDirecteur() {
        return this.directeur;
    }

    public NiveauxEtudes directeur(DirecteurEtude directeurEtude) {
        this.setDirecteur(directeurEtude);
        return this;
    }

    public void setDirecteur(DirecteurEtude directeurEtude) {
        this.directeur = directeurEtude;
    }

    public Serie getSerie() {
        return this.serie;
    }

    public NiveauxEtudes serie(Serie serie) {
        this.setSerie(serie);
        return this;
    }

    public void setSerie(Serie serie) {
        this.serie = serie;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NiveauxEtudes)) {
            return false;
        }
        return id != null && id.equals(((NiveauxEtudes) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NiveauxEtudes{" +
            "id=" + getId() +
            ", nomNiveau='" + getNomNiveau() + "'" +
            "}";
    }
}
