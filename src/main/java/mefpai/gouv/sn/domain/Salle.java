package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import mefpai.gouv.sn.domain.enumeration.Cdi;
import mefpai.gouv.sn.domain.enumeration.Jum;
import mefpai.gouv.sn.domain.enumeration.Specialise;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Salle.
 */
@Entity
@Table(name = "salle")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Salle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre_salleclasse", nullable = false)
    private String nombreSalleclasse;

    @NotNull
    @Column(name = "nombre_ateliers", nullable = false)
    private String nombreAteliers;

    @Enumerated(EnumType.STRING)
    @Column(name = "specialiase")
    private Specialise specialiase;

    @NotNull
    @Column(name = "nombre_salle_specialise", nullable = false)
    private String nombreSalleSpecialise;

    @Lob
    @Column(name = "justification_salle_spe")
    private String justificationSalleSpe;

    @Enumerated(EnumType.STRING)
    @Column(name = "cdi")
    private Cdi cdi;

    @Column(name = "nombre_cdi")
    private String nombreCDI;

    @Lob
    @Column(name = "justifiactif_salle_cdi")
    private String justifiactifSalleCDI;

    @Enumerated(EnumType.STRING)
    @Column(name = "jum")
    private Jum jum;

    @Column(name = "salle_jum")
    private String salleJum;

    @Lob
    @Column(name = "justifiactif_salle_jum")
    private String justifiactifSalleJum;

    @Column(name = "autre_salle")
    private String autreSalle;

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

    public Salle id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombreSalleclasse() {
        return this.nombreSalleclasse;
    }

    public Salle nombreSalleclasse(String nombreSalleclasse) {
        this.nombreSalleclasse = nombreSalleclasse;
        return this;
    }

    public void setNombreSalleclasse(String nombreSalleclasse) {
        this.nombreSalleclasse = nombreSalleclasse;
    }

    public String getNombreAteliers() {
        return this.nombreAteliers;
    }

    public Salle nombreAteliers(String nombreAteliers) {
        this.nombreAteliers = nombreAteliers;
        return this;
    }

    public void setNombreAteliers(String nombreAteliers) {
        this.nombreAteliers = nombreAteliers;
    }

    public Specialise getSpecialiase() {
        return this.specialiase;
    }

    public Salle specialiase(Specialise specialiase) {
        this.specialiase = specialiase;
        return this;
    }

    public void setSpecialiase(Specialise specialiase) {
        this.specialiase = specialiase;
    }

    public String getNombreSalleSpecialise() {
        return this.nombreSalleSpecialise;
    }

    public Salle nombreSalleSpecialise(String nombreSalleSpecialise) {
        this.nombreSalleSpecialise = nombreSalleSpecialise;
        return this;
    }

    public void setNombreSalleSpecialise(String nombreSalleSpecialise) {
        this.nombreSalleSpecialise = nombreSalleSpecialise;
    }

    public String getJustificationSalleSpe() {
        return this.justificationSalleSpe;
    }

    public Salle justificationSalleSpe(String justificationSalleSpe) {
        this.justificationSalleSpe = justificationSalleSpe;
        return this;
    }

    public void setJustificationSalleSpe(String justificationSalleSpe) {
        this.justificationSalleSpe = justificationSalleSpe;
    }

    public Cdi getCdi() {
        return this.cdi;
    }

    public Salle cdi(Cdi cdi) {
        this.cdi = cdi;
        return this;
    }

    public void setCdi(Cdi cdi) {
        this.cdi = cdi;
    }

    public String getNombreCDI() {
        return this.nombreCDI;
    }

    public Salle nombreCDI(String nombreCDI) {
        this.nombreCDI = nombreCDI;
        return this;
    }

    public void setNombreCDI(String nombreCDI) {
        this.nombreCDI = nombreCDI;
    }

    public String getJustifiactifSalleCDI() {
        return this.justifiactifSalleCDI;
    }

    public Salle justifiactifSalleCDI(String justifiactifSalleCDI) {
        this.justifiactifSalleCDI = justifiactifSalleCDI;
        return this;
    }

    public void setJustifiactifSalleCDI(String justifiactifSalleCDI) {
        this.justifiactifSalleCDI = justifiactifSalleCDI;
    }

    public Jum getJum() {
        return this.jum;
    }

    public Salle jum(Jum jum) {
        this.jum = jum;
        return this;
    }

    public void setJum(Jum jum) {
        this.jum = jum;
    }

    public String getSalleJum() {
        return this.salleJum;
    }

    public Salle salleJum(String salleJum) {
        this.salleJum = salleJum;
        return this;
    }

    public void setSalleJum(String salleJum) {
        this.salleJum = salleJum;
    }

    public String getJustifiactifSalleJum() {
        return this.justifiactifSalleJum;
    }

    public Salle justifiactifSalleJum(String justifiactifSalleJum) {
        this.justifiactifSalleJum = justifiactifSalleJum;
        return this;
    }

    public void setJustifiactifSalleJum(String justifiactifSalleJum) {
        this.justifiactifSalleJum = justifiactifSalleJum;
    }

    public String getAutreSalle() {
        return this.autreSalle;
    }

    public Salle autreSalle(String autreSalle) {
        this.autreSalle = autreSalle;
        return this;
    }

    public void setAutreSalle(String autreSalle) {
        this.autreSalle = autreSalle;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public Salle lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public DirecteurEtude getDirecteur() {
        return this.directeur;
    }

    public Salle directeur(DirecteurEtude directeurEtude) {
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
        if (!(o instanceof Salle)) {
            return false;
        }
        return id != null && id.equals(((Salle) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Salle{" +
            "id=" + getId() +
            ", nombreSalleclasse='" + getNombreSalleclasse() + "'" +
            ", nombreAteliers='" + getNombreAteliers() + "'" +
            ", specialiase='" + getSpecialiase() + "'" +
            ", nombreSalleSpecialise='" + getNombreSalleSpecialise() + "'" +
            ", justificationSalleSpe='" + getJustificationSalleSpe() + "'" +
            ", cdi='" + getCdi() + "'" +
            ", nombreCDI='" + getNombreCDI() + "'" +
            ", justifiactifSalleCDI='" + getJustifiactifSalleCDI() + "'" +
            ", jum='" + getJum() + "'" +
            ", salleJum='" + getSalleJum() + "'" +
            ", justifiactifSalleJum='" + getJustifiactifSalleJum() + "'" +
            ", autreSalle='" + getAutreSalle() + "'" +
            "}";
    }
}
