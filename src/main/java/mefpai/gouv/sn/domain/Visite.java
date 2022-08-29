package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import mefpai.gouv.sn.domain.enumeration.NatureV;
import mefpai.gouv.sn.domain.enumeration.ProvenanceV;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Visite.
 */
@Entity
@Table(name = "visite")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Visite implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "nature", nullable = false)
    private NatureV nature;

    @Column(name = "autre_nature")
    private String autreNature;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "provenance", nullable = false)
    private ProvenanceV provenance;

    @Column(name = "autre_provenance")
    private String autreProvenance;

    @Lob
    @Column(name = "objet", nullable = false)
    private String objet;

    @Lob
    @Column(name = "resultats", nullable = false)
    private String resultats;

    @NotNull
    @Column(name = "periode", nullable = false)
    private LocalDate periode;

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

    public Visite id(Long id) {
        this.id = id;
        return this;
    }

    public NatureV getNature() {
        return this.nature;
    }

    public Visite nature(NatureV nature) {
        this.nature = nature;
        return this;
    }

    public void setNature(NatureV nature) {
        this.nature = nature;
    }

    public String getAutreNature() {
        return this.autreNature;
    }

    public Visite autreNature(String autreNature) {
        this.autreNature = autreNature;
        return this;
    }

    public void setAutreNature(String autreNature) {
        this.autreNature = autreNature;
    }

    public ProvenanceV getProvenance() {
        return this.provenance;
    }

    public Visite provenance(ProvenanceV provenance) {
        this.provenance = provenance;
        return this;
    }

    public void setProvenance(ProvenanceV provenance) {
        this.provenance = provenance;
    }

    public String getAutreProvenance() {
        return this.autreProvenance;
    }

    public Visite autreProvenance(String autreProvenance) {
        this.autreProvenance = autreProvenance;
        return this;
    }

    public void setAutreProvenance(String autreProvenance) {
        this.autreProvenance = autreProvenance;
    }

    public String getObjet() {
        return this.objet;
    }

    public Visite objet(String objet) {
        this.objet = objet;
        return this;
    }

    public void setObjet(String objet) {
        this.objet = objet;
    }

    public String getResultats() {
        return this.resultats;
    }

    public Visite resultats(String resultats) {
        this.resultats = resultats;
        return this;
    }

    public void setResultats(String resultats) {
        this.resultats = resultats;
    }

    public LocalDate getPeriode() {
        return this.periode;
    }

    public Visite periode(LocalDate periode) {
        this.periode = periode;
        return this;
    }

    public void setPeriode(LocalDate periode) {
        this.periode = periode;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public Visite lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public Proviseur getProviseur() {
        return this.proviseur;
    }

    public Visite proviseur(Proviseur proviseur) {
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
        if (!(o instanceof Visite)) {
            return false;
        }
        return id != null && id.equals(((Visite) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Visite{" +
            "id=" + getId() +
            ", nature='" + getNature() + "'" +
            ", autreNature='" + getAutreNature() + "'" +
            ", provenance='" + getProvenance() + "'" +
            ", autreProvenance='" + getAutreProvenance() + "'" +
            ", objet='" + getObjet() + "'" +
            ", resultats='" + getResultats() + "'" +
            ", periode='" + getPeriode() + "'" +
            "}";
    }
}
