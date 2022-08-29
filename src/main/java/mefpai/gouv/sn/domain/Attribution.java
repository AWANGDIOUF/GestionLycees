package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Attribution.
 */
@Entity
@Table(name = "attribution")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Attribution implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "beneficiaire", nullable = false)
    private String beneficiaire;

    @NotNull
    @Column(name = "fonction", nullable = false)
    private String fonction;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

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

    public Attribution id(Long id) {
        this.id = id;
        return this;
    }

    public String getBeneficiaire() {
        return this.beneficiaire;
    }

    public Attribution beneficiaire(String beneficiaire) {
        this.beneficiaire = beneficiaire;
        return this;
    }

    public void setBeneficiaire(String beneficiaire) {
        this.beneficiaire = beneficiaire;
    }

    public String getFonction() {
        return this.fonction;
    }

    public Attribution fonction(String fonction) {
        this.fonction = fonction;
        return this;
    }

    public void setFonction(String fonction) {
        this.fonction = fonction;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Attribution date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public Attribution lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public ComptableMatiere getComptableMatiere() {
        return this.comptableMatiere;
    }

    public Attribution comptableMatiere(ComptableMatiere comptableMatiere) {
        this.setComptableMatiere(comptableMatiere);
        return this;
    }

    public void setComptableMatiere(ComptableMatiere comptableMatiere) {
        this.comptableMatiere = comptableMatiere;
    }

    public Reception getReception() {
        return this.reception;
    }

    public Attribution reception(Reception reception) {
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
        if (!(o instanceof Attribution)) {
            return false;
        }
        return id != null && id.equals(((Attribution) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Attribution{" +
            "id=" + getId() +
            ", beneficiaire='" + getBeneficiaire() + "'" +
            ", fonction='" + getFonction() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
