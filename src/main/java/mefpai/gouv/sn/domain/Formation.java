package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Duration;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Formation.
 */
@Entity
@Table(name = "formation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Formation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom_formation")
    private String nomFormation;

    @Column(name = "type_formation")
    private String typeFormation;

    @Column(name = "niveau_formation")
    private String niveauFormation;

    @Column(name = "duree")
    private Duration duree;

    @Column(name = "secteur")
    private String secteur;

    @Column(name = "modalite")
    private String modalite;

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

    public Formation id(Long id) {
        this.id = id;
        return this;
    }

    public String getNomFormation() {
        return this.nomFormation;
    }

    public Formation nomFormation(String nomFormation) {
        this.nomFormation = nomFormation;
        return this;
    }

    public void setNomFormation(String nomFormation) {
        this.nomFormation = nomFormation;
    }

    public String getTypeFormation() {
        return this.typeFormation;
    }

    public Formation typeFormation(String typeFormation) {
        this.typeFormation = typeFormation;
        return this;
    }

    public void setTypeFormation(String typeFormation) {
        this.typeFormation = typeFormation;
    }

    public String getNiveauFormation() {
        return this.niveauFormation;
    }

    public Formation niveauFormation(String niveauFormation) {
        this.niveauFormation = niveauFormation;
        return this;
    }

    public void setNiveauFormation(String niveauFormation) {
        this.niveauFormation = niveauFormation;
    }

    public Duration getDuree() {
        return this.duree;
    }

    public Formation duree(Duration duree) {
        this.duree = duree;
        return this;
    }

    public void setDuree(Duration duree) {
        this.duree = duree;
    }

    public String getSecteur() {
        return this.secteur;
    }

    public Formation secteur(String secteur) {
        this.secteur = secteur;
        return this;
    }

    public void setSecteur(String secteur) {
        this.secteur = secteur;
    }

    public String getModalite() {
        return this.modalite;
    }

    public Formation modalite(String modalite) {
        this.modalite = modalite;
        return this;
    }

    public void setModalite(String modalite) {
        this.modalite = modalite;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public Formation lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public DirecteurEtude getDirecteur() {
        return this.directeur;
    }

    public Formation directeur(DirecteurEtude directeurEtude) {
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
        if (!(o instanceof Formation)) {
            return false;
        }
        return id != null && id.equals(((Formation) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Formation{" +
            "id=" + getId() +
            ", nomFormation='" + getNomFormation() + "'" +
            ", typeFormation='" + getTypeFormation() + "'" +
            ", niveauFormation='" + getNiveauFormation() + "'" +
            ", duree='" + getDuree() + "'" +
            ", secteur='" + getSecteur() + "'" +
            ", modalite='" + getModalite() + "'" +
            "}";
    }
}
