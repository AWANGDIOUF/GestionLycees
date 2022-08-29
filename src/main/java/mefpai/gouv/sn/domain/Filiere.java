package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import mefpai.gouv.sn.domain.enumeration.Filieres;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Filiere.
 */
@Entity
@Table(name = "filiere")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Filiere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "nom_filiere", nullable = false)
    private Filieres nomFiliere;

    @Column(name = "nom_autre")
    private String nomAutre;

    @OneToMany(mappedBy = "filiere")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lyceesTechniques", "serie", "filiere", "proviseur" }, allowSetters = true)
    private Set<Enseignant> enseignants = new HashSet<>();

    @OneToMany(mappedBy = "filiere")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "niveauCalifications", "lyceesTechniques", "directeur", "filiere" }, allowSetters = true)
    private Set<Programme> programmes = new HashSet<>();

    @OneToMany(mappedBy = "filiere")
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

    public Filiere id(Long id) {
        this.id = id;
        return this;
    }

    public Filieres getNomFiliere() {
        return this.nomFiliere;
    }

    public Filiere nomFiliere(Filieres nomFiliere) {
        this.nomFiliere = nomFiliere;
        return this;
    }

    public void setNomFiliere(Filieres nomFiliere) {
        this.nomFiliere = nomFiliere;
    }

    public String getNomAutre() {
        return this.nomAutre;
    }

    public Filiere nomAutre(String nomAutre) {
        this.nomAutre = nomAutre;
        return this;
    }

    public void setNomAutre(String nomAutre) {
        this.nomAutre = nomAutre;
    }

    public Set<Enseignant> getEnseignants() {
        return this.enseignants;
    }

    public Filiere enseignants(Set<Enseignant> enseignants) {
        this.setEnseignants(enseignants);
        return this;
    }

    public Filiere addEnseignant(Enseignant enseignant) {
        this.enseignants.add(enseignant);
        enseignant.setFiliere(this);
        return this;
    }

    public Filiere removeEnseignant(Enseignant enseignant) {
        this.enseignants.remove(enseignant);
        enseignant.setFiliere(null);
        return this;
    }

    public void setEnseignants(Set<Enseignant> enseignants) {
        if (this.enseignants != null) {
            this.enseignants.forEach(i -> i.setFiliere(null));
        }
        if (enseignants != null) {
            enseignants.forEach(i -> i.setFiliere(this));
        }
        this.enseignants = enseignants;
    }

    public Set<Programme> getProgrammes() {
        return this.programmes;
    }

    public Filiere programmes(Set<Programme> programmes) {
        this.setProgrammes(programmes);
        return this;
    }

    public Filiere addProgramme(Programme programme) {
        this.programmes.add(programme);
        programme.setFiliere(this);
        return this;
    }

    public Filiere removeProgramme(Programme programme) {
        this.programmes.remove(programme);
        programme.setFiliere(null);
        return this;
    }

    public void setProgrammes(Set<Programme> programmes) {
        if (this.programmes != null) {
            this.programmes.forEach(i -> i.setFiliere(null));
        }
        if (programmes != null) {
            programmes.forEach(i -> i.setFiliere(this));
        }
        this.programmes = programmes;
    }

    public Set<Examen> getExamen() {
        return this.examen;
    }

    public Filiere examen(Set<Examen> examen) {
        this.setExamen(examen);
        return this;
    }

    public Filiere addExamen(Examen examen) {
        this.examen.add(examen);
        examen.setFiliere(this);
        return this;
    }

    public Filiere removeExamen(Examen examen) {
        this.examen.remove(examen);
        examen.setFiliere(null);
        return this;
    }

    public void setExamen(Set<Examen> examen) {
        if (this.examen != null) {
            this.examen.forEach(i -> i.setFiliere(null));
        }
        if (examen != null) {
            examen.forEach(i -> i.setFiliere(this));
        }
        this.examen = examen;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public Filiere lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public DirecteurEtude getDirecteur() {
        return this.directeur;
    }

    public Filiere directeur(DirecteurEtude directeurEtude) {
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
        if (!(o instanceof Filiere)) {
            return false;
        }
        return id != null && id.equals(((Filiere) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Filiere{" +
            "id=" + getId() +
            ", nomFiliere='" + getNomFiliere() + "'" +
            ", nomAutre='" + getNomAutre() + "'" +
            "}";
    }
}
