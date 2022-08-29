package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ComptableFinancier.
 */
@Entity
@Table(name = "comptable_financier")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ComptableFinancier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nom_prenom", nullable = false)
    private String nomPrenom;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

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
    @OneToOne
    @JoinColumn(unique = true)
    private LyceesTechniques nomLycee;

    @OneToMany(mappedBy = "comptableFinancier")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "depense", "lyceesTechniques", "comptableFinancier" }, allowSetters = true)
    private Set<Recette> recettes = new HashSet<>();

    @OneToMany(mappedBy = "comptableFinancier")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lyceesTechniques", "comptableFinancier", "recettes" }, allowSetters = true)
    private Set<Depense> depenses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ComptableFinancier id(Long id) {
        this.id = id;
        return this;
    }

    public String getNomPrenom() {
        return this.nomPrenom;
    }

    public ComptableFinancier nomPrenom(String nomPrenom) {
        this.nomPrenom = nomPrenom;
        return this;
    }

    public void setNomPrenom(String nomPrenom) {
        this.nomPrenom = nomPrenom;
    }

    public User getUser() {
        return this.user;
    }

    public ComptableFinancier user(User user) {
        this.setUser(user);
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LyceesTechniques getNomLycee() {
        return this.nomLycee;
    }

    public ComptableFinancier nomLycee(LyceesTechniques lyceesTechniques) {
        this.setNomLycee(lyceesTechniques);
        return this;
    }

    public void setNomLycee(LyceesTechniques lyceesTechniques) {
        this.nomLycee = lyceesTechniques;
    }

    public Set<Recette> getRecettes() {
        return this.recettes;
    }

    public ComptableFinancier recettes(Set<Recette> recettes) {
        this.setRecettes(recettes);
        return this;
    }

    public ComptableFinancier addRecette(Recette recette) {
        this.recettes.add(recette);
        recette.setComptableFinancier(this);
        return this;
    }

    public ComptableFinancier removeRecette(Recette recette) {
        this.recettes.remove(recette);
        recette.setComptableFinancier(null);
        return this;
    }

    public void setRecettes(Set<Recette> recettes) {
        if (this.recettes != null) {
            this.recettes.forEach(i -> i.setComptableFinancier(null));
        }
        if (recettes != null) {
            recettes.forEach(i -> i.setComptableFinancier(this));
        }
        this.recettes = recettes;
    }

    public Set<Depense> getDepenses() {
        return this.depenses;
    }

    public ComptableFinancier depenses(Set<Depense> depenses) {
        this.setDepenses(depenses);
        return this;
    }

    public ComptableFinancier addDepense(Depense depense) {
        this.depenses.add(depense);
        depense.setComptableFinancier(this);
        return this;
    }

    public ComptableFinancier removeDepense(Depense depense) {
        this.depenses.remove(depense);
        depense.setComptableFinancier(null);
        return this;
    }

    public void setDepenses(Set<Depense> depenses) {
        if (this.depenses != null) {
            this.depenses.forEach(i -> i.setComptableFinancier(null));
        }
        if (depenses != null) {
            depenses.forEach(i -> i.setComptableFinancier(this));
        }
        this.depenses = depenses;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ComptableFinancier)) {
            return false;
        }
        return id != null && id.equals(((ComptableFinancier) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ComptableFinancier{" +
            "id=" + getId() +
            ", nomPrenom='" + getNomPrenom() + "'" +
            "}";
    }
}
