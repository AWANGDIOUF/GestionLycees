package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import mefpai.gouv.sn.domain.enumeration.Categorie;
import mefpai.gouv.sn.domain.enumeration.EtatMateriel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Materiel.
 */
@Entity
@Table(name = "materiel")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Materiel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "categorie_materiel", nullable = false)
    private Categorie categorieMateriel;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "etat_materiel", nullable = false)
    private EtatMateriel etatMateriel;

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
        value = { "user", "nomLycee", "iventaireDesMatetieres", "mouvementMatieres", "reformeMatieres" },
        allowSetters = true
    )
    private ComptableMatiere comptableMatiere;

    @ManyToOne
    @JsonIgnoreProperties(value = { "materiels", "attributions", "lyceesTechniques", "comptableMatiere" }, allowSetters = true)
    private Reception reception;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Materiel id(Long id) {
        this.id = id;
        return this;
    }

    public Categorie getCategorieMateriel() {
        return this.categorieMateriel;
    }

    public Materiel categorieMateriel(Categorie categorieMateriel) {
        this.categorieMateriel = categorieMateriel;
        return this;
    }

    public void setCategorieMateriel(Categorie categorieMateriel) {
        this.categorieMateriel = categorieMateriel;
    }

    public EtatMateriel getEtatMateriel() {
        return this.etatMateriel;
    }

    public Materiel etatMateriel(EtatMateriel etatMateriel) {
        this.etatMateriel = etatMateriel;
        return this;
    }

    public void setEtatMateriel(EtatMateriel etatMateriel) {
        this.etatMateriel = etatMateriel;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public Materiel lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public ComptableMatiere getComptableMatiere() {
        return this.comptableMatiere;
    }

    public Materiel comptableMatiere(ComptableMatiere comptableMatiere) {
        this.setComptableMatiere(comptableMatiere);
        return this;
    }

    public void setComptableMatiere(ComptableMatiere comptableMatiere) {
        this.comptableMatiere = comptableMatiere;
    }

    public Reception getReception() {
        return this.reception;
    }

    public Materiel reception(Reception reception) {
        this.setReception(reception);
        return this;
    }

    public void setReception(Reception reception) {
        this.reception = reception;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Materiel)) {
            return false;
        }
        return id != null && id.equals(((Materiel) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Materiel{" +
            "id=" + getId() +
            ", categorieMateriel='" + getCategorieMateriel() + "'" +
            ", etatMateriel='" + getEtatMateriel() + "'" +
            "}";
    }
}
