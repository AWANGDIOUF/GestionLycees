package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import mefpai.gouv.sn.domain.enumeration.Series;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Serie.
 */
@Entity
@Table(name = "serie")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Serie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "nom_serie", nullable = false)
    private Series nomSerie;

    @Column(name = "autre_serie")
    private String autreSerie;

    @OneToMany(mappedBy = "serie")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lyceesTechniques", "serie", "filiere", "proviseur" }, allowSetters = true)
    private Set<Enseignant> enseignants = new HashSet<>();

    @OneToMany(mappedBy = "serie")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lyceesTechniques", "directeur", "serie" }, allowSetters = true)
    private Set<NiveauxEtudes> niveaus = new HashSet<>();

    @OneToMany(mappedBy = "serie")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lyceesTechniques", "directeur", "serie", "filiere", "apprenant" }, allowSetters = true)
    private Set<Examen> examen = new HashSet<>();

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

    public Serie id(Long id) {
        this.id = id;
        return this;
    }

    public Series getNomSerie() {
        return this.nomSerie;
    }

    public Serie nomSerie(Series nomSerie) {
        this.nomSerie = nomSerie;
        return this;
    }

    public void setNomSerie(Series nomSerie) {
        this.nomSerie = nomSerie;
    }

    public String getAutreSerie() {
        return this.autreSerie;
    }

    public Serie autreSerie(String autreSerie) {
        this.autreSerie = autreSerie;
        return this;
    }

    public void setAutreSerie(String autreSerie) {
        this.autreSerie = autreSerie;
    }

    public Set<Enseignant> getEnseignants() {
        return this.enseignants;
    }

    public Serie enseignants(Set<Enseignant> enseignants) {
        this.setEnseignants(enseignants);
        return this;
    }

    public Serie addEnseignant(Enseignant enseignant) {
        this.enseignants.add(enseignant);
        enseignant.setSerie(this);
        return this;
    }

    public Serie removeEnseignant(Enseignant enseignant) {
        this.enseignants.remove(enseignant);
        enseignant.setSerie(null);
        return this;
    }

    public void setEnseignants(Set<Enseignant> enseignants) {
        if (this.enseignants != null) {
            this.enseignants.forEach(i -> i.setSerie(null));
        }
        if (enseignants != null) {
            enseignants.forEach(i -> i.setSerie(this));
        }
        this.enseignants = enseignants;
    }

    public Set<NiveauxEtudes> getNiveaus() {
        return this.niveaus;
    }

    public Serie niveaus(Set<NiveauxEtudes> niveauxEtudes) {
        this.setNiveaus(niveauxEtudes);
        return this;
    }

    public Serie addNiveau(NiveauxEtudes niveauxEtudes) {
        this.niveaus.add(niveauxEtudes);
        niveauxEtudes.setSerie(this);
        return this;
    }

    public Serie removeNiveau(NiveauxEtudes niveauxEtudes) {
        this.niveaus.remove(niveauxEtudes);
        niveauxEtudes.setSerie(null);
        return this;
    }

    public void setNiveaus(Set<NiveauxEtudes> niveauxEtudes) {
        if (this.niveaus != null) {
            this.niveaus.forEach(i -> i.setSerie(null));
        }
        if (niveauxEtudes != null) {
            niveauxEtudes.forEach(i -> i.setSerie(this));
        }
        this.niveaus = niveauxEtudes;
    }

    public Set<Examen> getExamen() {
        return this.examen;
    }

    public Serie examen(Set<Examen> examen) {
        this.setExamen(examen);
        return this;
    }

    public Serie addExamen(Examen examen) {
        this.examen.add(examen);
        examen.setSerie(this);
        return this;
    }

    public Serie removeExamen(Examen examen) {
        this.examen.remove(examen);
        examen.setSerie(null);
        return this;
    }

    public void setExamen(Set<Examen> examen) {
        if (this.examen != null) {
            this.examen.forEach(i -> i.setSerie(null));
        }
        if (examen != null) {
            examen.forEach(i -> i.setSerie(this));
        }
        this.examen = examen;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public Serie lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public DirecteurEtude getDirecteur() {
        return this.directeur;
    }

    public Serie directeur(DirecteurEtude directeurEtude) {
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
        if (!(o instanceof Serie)) {
            return false;
        }
        return id != null && id.equals(((Serie) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Serie{" +
            "id=" + getId() +
            ", nomSerie='" + getNomSerie() + "'" +
            ", autreSerie='" + getAutreSerie() + "'" +
            "}";
    }
}
