package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import mefpai.gouv.sn.domain.enumeration.Option;
import mefpai.gouv.sn.domain.enumeration.StatusApp;
import mefpai.gouv.sn.domain.enumeration.TypeExam;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Examen.
 */
@Entity
@Table(name = "examen")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Examen implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private TypeExam type;

    @Column(name = "autres")
    private String autres;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_option")
    private Option option;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusApp status;

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

    @ManyToOne
    @JsonIgnoreProperties(value = { "enseignants", "niveaus", "examen", "lyceesTechniques", "directeur" }, allowSetters = true)
    private Serie serie;

    @ManyToOne
    @JsonIgnoreProperties(value = { "enseignants", "programmes", "examen", "lyceesTechniques", "directeur" }, allowSetters = true)
    private Filiere filiere;

    @ManyToOne
    @JsonIgnoreProperties(value = { "serie", "filiere", "examen", "lyceesTechniques", "directeur" }, allowSetters = true)
    private Apprenant apprenant;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Examen id(Long id) {
        this.id = id;
        return this;
    }

    public TypeExam getType() {
        return this.type;
    }

    public Examen type(TypeExam type) {
        this.type = type;
        return this;
    }

    public void setType(TypeExam type) {
        this.type = type;
    }

    public String getAutres() {
        return this.autres;
    }

    public Examen autres(String autres) {
        this.autres = autres;
        return this;
    }

    public void setAutres(String autres) {
        this.autres = autres;
    }

    public Option getOption() {
        return this.option;
    }

    public Examen option(Option option) {
        this.option = option;
        return this;
    }

    public void setOption(Option option) {
        this.option = option;
    }

    public StatusApp getStatus() {
        return this.status;
    }

    public Examen status(StatusApp status) {
        this.status = status;
        return this;
    }

    public void setStatus(StatusApp status) {
        this.status = status;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public Examen lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public DirecteurEtude getDirecteur() {
        return this.directeur;
    }

    public Examen directeur(DirecteurEtude directeurEtude) {
        this.setDirecteur(directeurEtude);
        return this;
    }

    public void setDirecteur(DirecteurEtude directeurEtude) {
        this.directeur = directeurEtude;
    }

    public Serie getSerie() {
        return this.serie;
    }

    public Examen serie(Serie serie) {
        this.setSerie(serie);
        return this;
    }

    public void setSerie(Serie serie) {
        this.serie = serie;
    }

    public Filiere getFiliere() {
        return this.filiere;
    }

    public Examen filiere(Filiere filiere) {
        this.setFiliere(filiere);
        return this;
    }

    public void setFiliere(Filiere filiere) {
        this.filiere = filiere;
    }

    public Apprenant getApprenant() {
        return this.apprenant;
    }

    public Examen apprenant(Apprenant apprenant) {
        this.setApprenant(apprenant);
        return this;
    }

    public void setApprenant(Apprenant apprenant) {
        this.apprenant = apprenant;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Examen)) {
            return false;
        }
        return id != null && id.equals(((Examen) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Examen{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", autres='" + getAutres() + "'" +
            ", option='" + getOption() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
