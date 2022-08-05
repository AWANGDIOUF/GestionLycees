package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import mefpai.gouv.sn.domain.enumeration.Group;
import mefpai.gouv.sn.domain.enumeration.ProvenanceMat;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Reception.
 */
@Entity
@Table(name = "reception")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Reception implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "libelle_materiel", nullable = false)
    private String libelleMateriel;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type_group", nullable = false)
    private Group typeGroup;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "provenance", nullable = false)
    private ProvenanceMat provenance;

    @NotNull
    @Column(name = "fournisseur", nullable = false)
    private String fournisseur;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @OneToMany(mappedBy = "reception")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lyceesTechniques", "comptableMatiere", "reception" }, allowSetters = true)
    private Set<Materiel> materiels = new HashSet<>();

    @OneToMany(mappedBy = "reception")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lyceesTechniques", "comptableMatiere", "reception" }, allowSetters = true)
    private Set<Attribution> attributions = new HashSet<>();

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

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Reception id(Long id) {
        this.id = id;
        return this;
    }

    public String getLibelleMateriel() {
        return this.libelleMateriel;
    }

    public Reception libelleMateriel(String libelleMateriel) {
        this.libelleMateriel = libelleMateriel;
        return this;
    }

    public void setLibelleMateriel(String libelleMateriel) {
        this.libelleMateriel = libelleMateriel;
    }

    public Group getTypeGroup() {
        return this.typeGroup;
    }

    public Reception typeGroup(Group typeGroup) {
        this.typeGroup = typeGroup;
        return this;
    }

    public void setTypeGroup(Group typeGroup) {
        this.typeGroup = typeGroup;
    }

    public ProvenanceMat getProvenance() {
        return this.provenance;
    }

    public Reception provenance(ProvenanceMat provenance) {
        this.provenance = provenance;
        return this;
    }

    public void setProvenance(ProvenanceMat provenance) {
        this.provenance = provenance;
    }

    public String getFournisseur() {
        return this.fournisseur;
    }

    public Reception fournisseur(String fournisseur) {
        this.fournisseur = fournisseur;
        return this;
    }

    public void setFournisseur(String fournisseur) {
        this.fournisseur = fournisseur;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Reception date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<Materiel> getMateriels() {
        return this.materiels;
    }

    public Reception materiels(Set<Materiel> materiels) {
        this.setMateriels(materiels);
        return this;
    }

    public Reception addMateriel(Materiel materiel) {
        this.materiels.add(materiel);
        materiel.setReception(this);
        return this;
    }

    public Reception removeMateriel(Materiel materiel) {
        this.materiels.remove(materiel);
        materiel.setReception(null);
        return this;
    }

    public void setMateriels(Set<Materiel> materiels) {
        if (this.materiels != null) {
            this.materiels.forEach(i -> i.setReception(null));
        }
        if (materiels != null) {
            materiels.forEach(i -> i.setReception(this));
        }
        this.materiels = materiels;
    }

    public Set<Attribution> getAttributions() {
        return this.attributions;
    }

    public Reception attributions(Set<Attribution> attributions) {
        this.setAttributions(attributions);
        return this;
    }

    public Reception addAttribution(Attribution attribution) {
        this.attributions.add(attribution);
        attribution.setReception(this);
        return this;
    }

    public Reception removeAttribution(Attribution attribution) {
        this.attributions.remove(attribution);
        attribution.setReception(null);
        return this;
    }

    public void setAttributions(Set<Attribution> attributions) {
        if (this.attributions != null) {
            this.attributions.forEach(i -> i.setReception(null));
        }
        if (attributions != null) {
            attributions.forEach(i -> i.setReception(this));
        }
        this.attributions = attributions;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public Reception lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public ComptableMatiere getComptableMatiere() {
        return this.comptableMatiere;
    }

    public Reception comptableMatiere(ComptableMatiere comptableMatiere) {
        this.setComptableMatiere(comptableMatiere);
        return this;
    }

    public void setComptableMatiere(ComptableMatiere comptableMatiere) {
        this.comptableMatiere = comptableMatiere;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Reception)) {
            return false;
        }
        return id != null && id.equals(((Reception) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Reception{" +
            "id=" + getId() +
            ", libelleMateriel='" + getLibelleMateriel() + "'" +
            ", typeGroup='" + getTypeGroup() + "'" +
            ", provenance='" + getProvenance() + "'" +
            ", fournisseur='" + getFournisseur() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
