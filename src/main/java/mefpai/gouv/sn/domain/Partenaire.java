package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import mefpai.gouv.sn.domain.enumeration.NaturePart;
import mefpai.gouv.sn.domain.enumeration.Provenance;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Partenaire.
 */
@Entity
@Table(name = "partenaire")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Partenaire implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "denomination_partenaire", nullable = false)
    private String denominationPartenaire;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "categorie_provenaire", nullable = false)
    private Provenance categorieProvenaire;

    @Column(name = "autre_categorie")
    private String autreCategorie;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "nature", nullable = false)
    private NaturePart nature;

    @Column(name = "autre_nature")
    private String autreNature;

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

    public Partenaire id(Long id) {
        this.id = id;
        return this;
    }

    public String getDenominationPartenaire() {
        return this.denominationPartenaire;
    }

    public Partenaire denominationPartenaire(String denominationPartenaire) {
        this.denominationPartenaire = denominationPartenaire;
        return this;
    }

    public void setDenominationPartenaire(String denominationPartenaire) {
        this.denominationPartenaire = denominationPartenaire;
    }

    public Provenance getCategorieProvenaire() {
        return this.categorieProvenaire;
    }

    public Partenaire categorieProvenaire(Provenance categorieProvenaire) {
        this.categorieProvenaire = categorieProvenaire;
        return this;
    }

    public void setCategorieProvenaire(Provenance categorieProvenaire) {
        this.categorieProvenaire = categorieProvenaire;
    }

    public String getAutreCategorie() {
        return this.autreCategorie;
    }

    public Partenaire autreCategorie(String autreCategorie) {
        this.autreCategorie = autreCategorie;
        return this;
    }

    public void setAutreCategorie(String autreCategorie) {
        this.autreCategorie = autreCategorie;
    }

    public NaturePart getNature() {
        return this.nature;
    }

    public Partenaire nature(NaturePart nature) {
        this.nature = nature;
        return this;
    }

    public void setNature(NaturePart nature) {
        this.nature = nature;
    }

    public String getAutreNature() {
        return this.autreNature;
    }

    public Partenaire autreNature(String autreNature) {
        this.autreNature = autreNature;
        return this;
    }

    public void setAutreNature(String autreNature) {
        this.autreNature = autreNature;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public Partenaire lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public Proviseur getProviseur() {
        return this.proviseur;
    }

    public Partenaire proviseur(Proviseur proviseur) {
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
        if (!(o instanceof Partenaire)) {
            return false;
        }
        return id != null && id.equals(((Partenaire) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Partenaire{" +
            "id=" + getId() +
            ", denominationPartenaire='" + getDenominationPartenaire() + "'" +
            ", categorieProvenaire='" + getCategorieProvenaire() + "'" +
            ", autreCategorie='" + getAutreCategorie() + "'" +
            ", nature='" + getNature() + "'" +
            ", autreNature='" + getAutreNature() + "'" +
            "}";
    }
}
