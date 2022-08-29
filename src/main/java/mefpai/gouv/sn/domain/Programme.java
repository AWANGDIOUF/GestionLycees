package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Programme.
 */
@Entity
@Table(name = "programme")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Programme implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom_programme")
    private String nomProgramme;

    @OneToMany(mappedBy = "programme")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lyceesTechniques", "directeur", "programme" }, allowSetters = true)
    private Set<NiveauxCalification> niveauCalifications = new HashSet<>();

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
    @JsonIgnoreProperties(value = { "enseignants", "programmes", "examen", "lyceesTechniques", "directeur" }, allowSetters = true)
    private Filiere filiere;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Programme id(Long id) {
        this.id = id;
        return this;
    }

    public String getNomProgramme() {
        return this.nomProgramme;
    }

    public Programme nomProgramme(String nomProgramme) {
        this.nomProgramme = nomProgramme;
        return this;
    }

    public void setNomProgramme(String nomProgramme) {
        this.nomProgramme = nomProgramme;
    }

    public Set<NiveauxCalification> getNiveauCalifications() {
        return this.niveauCalifications;
    }

    public Programme niveauCalifications(Set<NiveauxCalification> niveauxCalifications) {
        this.setNiveauCalifications(niveauxCalifications);
        return this;
    }

    public Programme addNiveauCalification(NiveauxCalification niveauxCalification) {
        this.niveauCalifications.add(niveauxCalification);
        niveauxCalification.setProgramme(this);
        return this;
    }

    public Programme removeNiveauCalification(NiveauxCalification niveauxCalification) {
        this.niveauCalifications.remove(niveauxCalification);
        niveauxCalification.setProgramme(null);
        return this;
    }

    public void setNiveauCalifications(Set<NiveauxCalification> niveauxCalifications) {
        if (this.niveauCalifications != null) {
            this.niveauCalifications.forEach(i -> i.setProgramme(null));
        }
        if (niveauxCalifications != null) {
            niveauxCalifications.forEach(i -> i.setProgramme(this));
        }
        this.niveauCalifications = niveauxCalifications;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public Programme lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public DirecteurEtude getDirecteur() {
        return this.directeur;
    }

    public Programme directeur(DirecteurEtude directeurEtude) {
        this.setDirecteur(directeurEtude);
        return this;
    }

    public void setDirecteur(DirecteurEtude directeurEtude) {
        this.directeur = directeurEtude;
    }

    public Filiere getFiliere() {
        return this.filiere;
    }

    public Programme filiere(Filiere filiere) {
        this.setFiliere(filiere);
        return this;
    }

    public void setFiliere(Filiere filiere) {
        this.filiere = filiere;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Programme)) {
            return false;
        }
        return id != null && id.equals(((Programme) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Programme{" +
            "id=" + getId() +
            ", nomProgramme='" + getNomProgramme() + "'" +
            "}";
    }
}
