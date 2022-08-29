package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import mefpai.gouv.sn.domain.enumeration.Genre;
import mefpai.gouv.sn.domain.enumeration.Option;
import mefpai.gouv.sn.domain.enumeration.Situation;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Apprenant.
 */
@Entity
@Table(name = "apprenant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Apprenant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nom_prenom", nullable = false)
    private String nomPrenom;

    @NotNull
    @Column(name = "date_naissance", nullable = false)
    private LocalDate dateNaissance;

    @NotNull
    @Column(name = "lieu_naissance", nullable = false)
    private String lieuNaissance;

    @NotNull
    @Column(name = "telephone", nullable = false)
    private String telephone;

    @NotNull
    @Column(name = "adresse", nullable = false)
    private String adresse;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "sexe", nullable = false)
    private Genre sexe;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_option")
    private Option option;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "situation_matrimoniale", nullable = false)
    private Situation situationMatrimoniale;

    @NotNull
    @Column(name = "tuteur", nullable = false)
    private String tuteur;

    @NotNull
    @Column(name = "contact_tuteur", nullable = false)
    private String contactTuteur;

    @JsonIgnoreProperties(value = { "enseignants", "niveaus", "examen", "lyceesTechniques", "directeur" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Serie serie;

    @JsonIgnoreProperties(value = { "enseignants", "programmes", "examen", "lyceesTechniques", "directeur" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Filiere filiere;

    @OneToMany(mappedBy = "apprenant")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lyceesTechniques", "directeur", "serie", "filiere", "apprenant" }, allowSetters = true)
    private Set<Examen> examen = new HashSet<>();

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

    public Apprenant id(Long id) {
        this.id = id;
        return this;
    }

    public String getNomPrenom() {
        return this.nomPrenom;
    }

    public Apprenant nomPrenom(String nomPrenom) {
        this.nomPrenom = nomPrenom;
        return this;
    }

    public void setNomPrenom(String nomPrenom) {
        this.nomPrenom = nomPrenom;
    }

    public LocalDate getDateNaissance() {
        return this.dateNaissance;
    }

    public Apprenant dateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
        return this;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getLieuNaissance() {
        return this.lieuNaissance;
    }

    public Apprenant lieuNaissance(String lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
        return this;
    }

    public void setLieuNaissance(String lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
    }

    public String getTelephone() {
        return this.telephone;
    }

    public Apprenant telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getAdresse() {
        return this.adresse;
    }

    public Apprenant adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Genre getSexe() {
        return this.sexe;
    }

    public Apprenant sexe(Genre sexe) {
        this.sexe = sexe;
        return this;
    }

    public void setSexe(Genre sexe) {
        this.sexe = sexe;
    }

    public Option getOption() {
        return this.option;
    }

    public Apprenant option(Option option) {
        this.option = option;
        return this;
    }

    public void setOption(Option option) {
        this.option = option;
    }

    public Situation getSituationMatrimoniale() {
        return this.situationMatrimoniale;
    }

    public Apprenant situationMatrimoniale(Situation situationMatrimoniale) {
        this.situationMatrimoniale = situationMatrimoniale;
        return this;
    }

    public void setSituationMatrimoniale(Situation situationMatrimoniale) {
        this.situationMatrimoniale = situationMatrimoniale;
    }

    public String getTuteur() {
        return this.tuteur;
    }

    public Apprenant tuteur(String tuteur) {
        this.tuteur = tuteur;
        return this;
    }

    public void setTuteur(String tuteur) {
        this.tuteur = tuteur;
    }

    public String getContactTuteur() {
        return this.contactTuteur;
    }

    public Apprenant contactTuteur(String contactTuteur) {
        this.contactTuteur = contactTuteur;
        return this;
    }

    public void setContactTuteur(String contactTuteur) {
        this.contactTuteur = contactTuteur;
    }

    public Serie getSerie() {
        return this.serie;
    }

    public Apprenant serie(Serie serie) {
        this.setSerie(serie);
        return this;
    }

    public void setSerie(Serie serie) {
        this.serie = serie;
    }

    public Filiere getFiliere() {
        return this.filiere;
    }

    public Apprenant filiere(Filiere filiere) {
        this.setFiliere(filiere);
        return this;
    }

    public void setFiliere(Filiere filiere) {
        this.filiere = filiere;
    }

    public Set<Examen> getExamen() {
        return this.examen;
    }

    public Apprenant examen(Set<Examen> examen) {
        this.setExamen(examen);
        return this;
    }

    public Apprenant addExamen(Examen examen) {
        this.examen.add(examen);
        examen.setApprenant(this);
        return this;
    }

    public Apprenant removeExamen(Examen examen) {
        this.examen.remove(examen);
        examen.setApprenant(null);
        return this;
    }

    public void setExamen(Set<Examen> examen) {
        if (this.examen != null) {
            this.examen.forEach(i -> i.setApprenant(null));
        }
        if (examen != null) {
            examen.forEach(i -> i.setApprenant(this));
        }
        this.examen = examen;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public Apprenant lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public DirecteurEtude getDirecteur() {
        return this.directeur;
    }

    public Apprenant directeur(DirecteurEtude directeurEtude) {
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
        if (!(o instanceof Apprenant)) {
            return false;
        }
        return id != null && id.equals(((Apprenant) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Apprenant{" +
            "id=" + getId() +
            ", nomPrenom='" + getNomPrenom() + "'" +
            ", dateNaissance='" + getDateNaissance() + "'" +
            ", lieuNaissance='" + getLieuNaissance() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", sexe='" + getSexe() + "'" +
            ", option='" + getOption() + "'" +
            ", situationMatrimoniale='" + getSituationMatrimoniale() + "'" +
            ", tuteur='" + getTuteur() + "'" +
            ", contactTuteur='" + getContactTuteur() + "'" +
            "}";
    }
}
