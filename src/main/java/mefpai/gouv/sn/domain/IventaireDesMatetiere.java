package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import mefpai.gouv.sn.domain.enumeration.Group;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A IventaireDesMatetiere.
 */
@Entity
@Table(name = "iventaire_des_matetiere")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class IventaireDesMatetiere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_group")
    private Group group;

    @Lob
    @Column(name = "designation_membre")
    private byte[] designationMembre;

    @Column(name = "designation_membre_content_type")
    private String designationMembreContentType;

    @Lob
    @Column(name = "pv_dinventaire")
    private byte[] pvDinventaire;

    @Column(name = "pv_dinventaire_content_type")
    private String pvDinventaireContentType;

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

    public IventaireDesMatetiere id(Long id) {
        this.id = id;
        return this;
    }

    public Group getGroup() {
        return this.group;
    }

    public IventaireDesMatetiere group(Group group) {
        this.group = group;
        return this;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public byte[] getDesignationMembre() {
        return this.designationMembre;
    }

    public IventaireDesMatetiere designationMembre(byte[] designationMembre) {
        this.designationMembre = designationMembre;
        return this;
    }

    public void setDesignationMembre(byte[] designationMembre) {
        this.designationMembre = designationMembre;
    }

    public String getDesignationMembreContentType() {
        return this.designationMembreContentType;
    }

    public IventaireDesMatetiere designationMembreContentType(String designationMembreContentType) {
        this.designationMembreContentType = designationMembreContentType;
        return this;
    }

    public void setDesignationMembreContentType(String designationMembreContentType) {
        this.designationMembreContentType = designationMembreContentType;
    }

    public byte[] getPvDinventaire() {
        return this.pvDinventaire;
    }

    public IventaireDesMatetiere pvDinventaire(byte[] pvDinventaire) {
        this.pvDinventaire = pvDinventaire;
        return this;
    }

    public void setPvDinventaire(byte[] pvDinventaire) {
        this.pvDinventaire = pvDinventaire;
    }

    public String getPvDinventaireContentType() {
        return this.pvDinventaireContentType;
    }

    public IventaireDesMatetiere pvDinventaireContentType(String pvDinventaireContentType) {
        this.pvDinventaireContentType = pvDinventaireContentType;
        return this;
    }

    public void setPvDinventaireContentType(String pvDinventaireContentType) {
        this.pvDinventaireContentType = pvDinventaireContentType;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public IventaireDesMatetiere lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public ComptableMatiere getComptableMatiere() {
        return this.comptableMatiere;
    }

    public IventaireDesMatetiere comptableMatiere(ComptableMatiere comptableMatiere) {
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
        if (!(o instanceof IventaireDesMatetiere)) {
            return false;
        }
        return id != null && id.equals(((IventaireDesMatetiere) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "IventaireDesMatetiere{" +
            "id=" + getId() +
            ", group='" + getGroup() + "'" +
            ", designationMembre='" + getDesignationMembre() + "'" +
            ", designationMembreContentType='" + getDesignationMembreContentType() + "'" +
            ", pvDinventaire='" + getPvDinventaire() + "'" +
            ", pvDinventaireContentType='" + getPvDinventaireContentType() + "'" +
            "}";
    }
}
