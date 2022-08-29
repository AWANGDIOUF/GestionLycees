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
 * A Proviseur.
 */
@Entity
@Table(name = "proviseur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Proviseur implements Serializable {

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

    @OneToMany(mappedBy = "proviseur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lyceesTechniques", "proviseur" }, allowSetters = true)
    private Set<PersonnelAdministratif> personnelAdmiistratifs = new HashSet<>();

    @OneToMany(mappedBy = "proviseur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lyceesTechniques", "proviseur" }, allowSetters = true)
    private Set<Partenaire> partenaires = new HashSet<>();

    @OneToMany(mappedBy = "proviseur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lyceesTechniques", "proviseur" }, allowSetters = true)
    private Set<Besoin> besoins = new HashSet<>();

    @OneToMany(mappedBy = "proviseur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lyceesTechniques", "proviseur" }, allowSetters = true)
    private Set<OrganeGestion> organes = new HashSet<>();

    @OneToMany(mappedBy = "proviseur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lyceesTechniques", "proviseur" }, allowSetters = true)
    private Set<Visite> visites = new HashSet<>();

    @OneToMany(mappedBy = "proviseur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lyceesTechniques", "proviseur" }, allowSetters = true)
    private Set<Difficulte> difficultes = new HashSet<>();

    @OneToMany(mappedBy = "proviseur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lyceesTechniques", "serie", "filiere", "proviseur" }, allowSetters = true)
    private Set<Enseignant> enseignants = new HashSet<>();

    @OneToMany(mappedBy = "directeur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lyceesTechniques", "directeur" }, allowSetters = true)
    private Set<PersonnelAppui> personnelAppuis = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Proviseur id(Long id) {
        this.id = id;
        return this;
    }

    public String getNomPrenom() {
        return this.nomPrenom;
    }

    public Proviseur nomPrenom(String nomPrenom) {
        this.nomPrenom = nomPrenom;
        return this;
    }

    public void setNomPrenom(String nomPrenom) {
        this.nomPrenom = nomPrenom;
    }

    public User getUser() {
        return this.user;
    }

    public Proviseur user(User user) {
        this.setUser(user);
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LyceesTechniques getNomLycee() {
        return this.nomLycee;
    }

    public Proviseur nomLycee(LyceesTechniques lyceesTechniques) {
        this.setNomLycee(lyceesTechniques);
        return this;
    }

    public void setNomLycee(LyceesTechniques lyceesTechniques) {
        this.nomLycee = lyceesTechniques;
    }

    public Set<PersonnelAdministratif> getPersonnelAdmiistratifs() {
        return this.personnelAdmiistratifs;
    }

    public Proviseur personnelAdmiistratifs(Set<PersonnelAdministratif> personnelAdministratifs) {
        this.setPersonnelAdmiistratifs(personnelAdministratifs);
        return this;
    }

    public Proviseur addPersonnelAdmiistratif(PersonnelAdministratif personnelAdministratif) {
        this.personnelAdmiistratifs.add(personnelAdministratif);
        personnelAdministratif.setProviseur(this);
        return this;
    }

    public Proviseur removePersonnelAdmiistratif(PersonnelAdministratif personnelAdministratif) {
        this.personnelAdmiistratifs.remove(personnelAdministratif);
        personnelAdministratif.setProviseur(null);
        return this;
    }

    public void setPersonnelAdmiistratifs(Set<PersonnelAdministratif> personnelAdministratifs) {
        if (this.personnelAdmiistratifs != null) {
            this.personnelAdmiistratifs.forEach(i -> i.setProviseur(null));
        }
        if (personnelAdministratifs != null) {
            personnelAdministratifs.forEach(i -> i.setProviseur(this));
        }
        this.personnelAdmiistratifs = personnelAdministratifs;
    }

    public Set<Partenaire> getPartenaires() {
        return this.partenaires;
    }

    public Proviseur partenaires(Set<Partenaire> partenaires) {
        this.setPartenaires(partenaires);
        return this;
    }

    public Proviseur addPartenaire(Partenaire partenaire) {
        this.partenaires.add(partenaire);
        partenaire.setProviseur(this);
        return this;
    }

    public Proviseur removePartenaire(Partenaire partenaire) {
        this.partenaires.remove(partenaire);
        partenaire.setProviseur(null);
        return this;
    }

    public void setPartenaires(Set<Partenaire> partenaires) {
        if (this.partenaires != null) {
            this.partenaires.forEach(i -> i.setProviseur(null));
        }
        if (partenaires != null) {
            partenaires.forEach(i -> i.setProviseur(this));
        }
        this.partenaires = partenaires;
    }

    public Set<Besoin> getBesoins() {
        return this.besoins;
    }

    public Proviseur besoins(Set<Besoin> besoins) {
        this.setBesoins(besoins);
        return this;
    }

    public Proviseur addBesoin(Besoin besoin) {
        this.besoins.add(besoin);
        besoin.setProviseur(this);
        return this;
    }

    public Proviseur removeBesoin(Besoin besoin) {
        this.besoins.remove(besoin);
        besoin.setProviseur(null);
        return this;
    }

    public void setBesoins(Set<Besoin> besoins) {
        if (this.besoins != null) {
            this.besoins.forEach(i -> i.setProviseur(null));
        }
        if (besoins != null) {
            besoins.forEach(i -> i.setProviseur(this));
        }
        this.besoins = besoins;
    }

    public Set<OrganeGestion> getOrganes() {
        return this.organes;
    }

    public Proviseur organes(Set<OrganeGestion> organeGestions) {
        this.setOrganes(organeGestions);
        return this;
    }

    public Proviseur addOrgane(OrganeGestion organeGestion) {
        this.organes.add(organeGestion);
        organeGestion.setProviseur(this);
        return this;
    }

    public Proviseur removeOrgane(OrganeGestion organeGestion) {
        this.organes.remove(organeGestion);
        organeGestion.setProviseur(null);
        return this;
    }

    public void setOrganes(Set<OrganeGestion> organeGestions) {
        if (this.organes != null) {
            this.organes.forEach(i -> i.setProviseur(null));
        }
        if (organeGestions != null) {
            organeGestions.forEach(i -> i.setProviseur(this));
        }
        this.organes = organeGestions;
    }

    public Set<Visite> getVisites() {
        return this.visites;
    }

    public Proviseur visites(Set<Visite> visites) {
        this.setVisites(visites);
        return this;
    }

    public Proviseur addVisite(Visite visite) {
        this.visites.add(visite);
        visite.setProviseur(this);
        return this;
    }

    public Proviseur removeVisite(Visite visite) {
        this.visites.remove(visite);
        visite.setProviseur(null);
        return this;
    }

    public void setVisites(Set<Visite> visites) {
        if (this.visites != null) {
            this.visites.forEach(i -> i.setProviseur(null));
        }
        if (visites != null) {
            visites.forEach(i -> i.setProviseur(this));
        }
        this.visites = visites;
    }

    public Set<Difficulte> getDifficultes() {
        return this.difficultes;
    }

    public Proviseur difficultes(Set<Difficulte> difficultes) {
        this.setDifficultes(difficultes);
        return this;
    }

    public Proviseur addDifficulte(Difficulte difficulte) {
        this.difficultes.add(difficulte);
        difficulte.setProviseur(this);
        return this;
    }

    public Proviseur removeDifficulte(Difficulte difficulte) {
        this.difficultes.remove(difficulte);
        difficulte.setProviseur(null);
        return this;
    }

    public void setDifficultes(Set<Difficulte> difficultes) {
        if (this.difficultes != null) {
            this.difficultes.forEach(i -> i.setProviseur(null));
        }
        if (difficultes != null) {
            difficultes.forEach(i -> i.setProviseur(this));
        }
        this.difficultes = difficultes;
    }

    public Set<Enseignant> getEnseignants() {
        return this.enseignants;
    }

    public Proviseur enseignants(Set<Enseignant> enseignants) {
        this.setEnseignants(enseignants);
        return this;
    }

    public Proviseur addEnseignant(Enseignant enseignant) {
        this.enseignants.add(enseignant);
        enseignant.setProviseur(this);
        return this;
    }

    public Proviseur removeEnseignant(Enseignant enseignant) {
        this.enseignants.remove(enseignant);
        enseignant.setProviseur(null);
        return this;
    }

    public void setEnseignants(Set<Enseignant> enseignants) {
        if (this.enseignants != null) {
            this.enseignants.forEach(i -> i.setProviseur(null));
        }
        if (enseignants != null) {
            enseignants.forEach(i -> i.setProviseur(this));
        }
        this.enseignants = enseignants;
    }

    public Set<PersonnelAppui> getPersonnelAppuis() {
        return this.personnelAppuis;
    }

    public Proviseur personnelAppuis(Set<PersonnelAppui> personnelAppuis) {
        this.setPersonnelAppuis(personnelAppuis);
        return this;
    }

    public Proviseur addPersonnelAppui(PersonnelAppui personnelAppui) {
        this.personnelAppuis.add(personnelAppui);
        personnelAppui.setDirecteur(this);
        return this;
    }

    public Proviseur removePersonnelAppui(PersonnelAppui personnelAppui) {
        this.personnelAppuis.remove(personnelAppui);
        personnelAppui.setDirecteur(null);
        return this;
    }

    public void setPersonnelAppuis(Set<PersonnelAppui> personnelAppuis) {
        if (this.personnelAppuis != null) {
            this.personnelAppuis.forEach(i -> i.setDirecteur(null));
        }
        if (personnelAppuis != null) {
            personnelAppuis.forEach(i -> i.setDirecteur(this));
        }
        this.personnelAppuis = personnelAppuis;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Proviseur)) {
            return false;
        }
        return id != null && id.equals(((Proviseur) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Proviseur{" +
            "id=" + getId() +
            ", nomPrenom='" + getNomPrenom() + "'" +
            "}";
    }
}
