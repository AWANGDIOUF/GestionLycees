package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import mefpai.gouv.sn.domain.enumeration.TypeR;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Recette.
 */
@Entity
@Table(name = "recette")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Recette implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private TypeR type;

    @Column(name = "autre_recette")
    private String autreRecette;

    @Column(name = "type_ressource")
    private String typeRessource;

    @Column(name = "montant")
    private String montant;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @ManyToOne
    @JsonIgnoreProperties(value = { "lyceesTechniques", "comptableFinancier", "recettes" }, allowSetters = true)
    private Depense depense;

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
    @JsonIgnoreProperties(value = { "user", "nomLycee", "recettes", "depenses" }, allowSetters = true)
    private ComptableFinancier comptableFinancier;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Recette id(Long id) {
        this.id = id;
        return this;
    }

    public TypeR getType() {
        return this.type;
    }

    public Recette type(TypeR type) {
        this.type = type;
        return this;
    }

    public void setType(TypeR type) {
        this.type = type;
    }

    public String getAutreRecette() {
        return this.autreRecette;
    }

    public Recette autreRecette(String autreRecette) {
        this.autreRecette = autreRecette;
        return this;
    }

    public void setAutreRecette(String autreRecette) {
        this.autreRecette = autreRecette;
    }

    public String getTypeRessource() {
        return this.typeRessource;
    }

    public Recette typeRessource(String typeRessource) {
        this.typeRessource = typeRessource;
        return this;
    }

    public void setTypeRessource(String typeRessource) {
        this.typeRessource = typeRessource;
    }

    public String getMontant() {
        return this.montant;
    }

    public Recette montant(String montant) {
        this.montant = montant;
        return this;
    }

    public void setMontant(String montant) {
        this.montant = montant;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Recette date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Depense getDepense() {
        return this.depense;
    }

    public Recette depense(Depense depense) {
        this.setDepense(depense);
        return this;
    }

    public void setDepense(Depense depense) {
        this.depense = depense;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public Recette lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public ComptableFinancier getComptableFinancier() {
        return this.comptableFinancier;
    }

    public Recette comptableFinancier(ComptableFinancier comptableFinancier) {
        this.setComptableFinancier(comptableFinancier);
        return this;
    }

    public void setComptableFinancier(ComptableFinancier comptableFinancier) {
        this.comptableFinancier = comptableFinancier;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Recette)) {
            return false;
        }
        return id != null && id.equals(((Recette) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Recette{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", autreRecette='" + getAutreRecette() + "'" +
            ", typeRessource='" + getTypeRessource() + "'" +
            ", montant='" + getMontant() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
