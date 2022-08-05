package mefpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import mefpai.gouv.sn.domain.enumeration.Group;
import mefpai.gouv.sn.domain.enumeration.Groupe;
import mefpai.gouv.sn.domain.enumeration.Mouvement;
import mefpai.gouv.sn.domain.enumeration.Organisation;
import mefpai.gouv.sn.domain.enumeration.Ressouces;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A MouvementMatiere.
 */
@Entity
@Table(name = "mouvement_matiere")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MouvementMatiere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_mouvement")
    private Mouvement typeMouvement;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_group")
    private Group group;

    @Enumerated(EnumType.STRING)
    @Column(name = "organisation")
    private Organisation organisation;

    @Column(name = "autre_organisation")
    private String autreOrganisation;

    @Enumerated(EnumType.STRING)
    @Column(name = "ressource")
    private Ressouces ressource;

    @Column(name = "autre_ressource")
    private String autreRessource;

    @Lob
    @Column(name = "designation")
    private byte[] designation;

    @Column(name = "designation_content_type")
    private String designationContentType;

    @Lob
    @Column(name = "pv_reception")
    private byte[] pvReception;

    @Column(name = "pv_reception_content_type")
    private String pvReceptionContentType;

    @Lob
    @Column(name = "bordeau_de_livraison")
    private byte[] bordeauDeLivraison;

    @Column(name = "bordeau_de_livraison_content_type")
    private String bordeauDeLivraisonContentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "groupe")
    private Groupe groupe;

    @Lob
    @Column(name = "bon_de_sortie")
    private byte[] bonDeSortie;

    @Column(name = "bon_de_sortie_content_type")
    private String bonDeSortieContentType;

    @Lob
    @Column(name = "certificat_administratif")
    private byte[] certificatAdministratif;

    @Column(name = "certificat_administratif_content_type")
    private String certificatAdministratifContentType;

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

    public MouvementMatiere id(Long id) {
        this.id = id;
        return this;
    }

    public Mouvement getTypeMouvement() {
        return this.typeMouvement;
    }

    public MouvementMatiere typeMouvement(Mouvement typeMouvement) {
        this.typeMouvement = typeMouvement;
        return this;
    }

    public void setTypeMouvement(Mouvement typeMouvement) {
        this.typeMouvement = typeMouvement;
    }

    public Group getGroup() {
        return this.group;
    }

    public MouvementMatiere group(Group group) {
        this.group = group;
        return this;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public Organisation getOrganisation() {
        return this.organisation;
    }

    public MouvementMatiere organisation(Organisation organisation) {
        this.organisation = organisation;
        return this;
    }

    public void setOrganisation(Organisation organisation) {
        this.organisation = organisation;
    }

    public String getAutreOrganisation() {
        return this.autreOrganisation;
    }

    public MouvementMatiere autreOrganisation(String autreOrganisation) {
        this.autreOrganisation = autreOrganisation;
        return this;
    }

    public void setAutreOrganisation(String autreOrganisation) {
        this.autreOrganisation = autreOrganisation;
    }

    public Ressouces getRessource() {
        return this.ressource;
    }

    public MouvementMatiere ressource(Ressouces ressource) {
        this.ressource = ressource;
        return this;
    }

    public void setRessource(Ressouces ressource) {
        this.ressource = ressource;
    }

    public String getAutreRessource() {
        return this.autreRessource;
    }

    public MouvementMatiere autreRessource(String autreRessource) {
        this.autreRessource = autreRessource;
        return this;
    }

    public void setAutreRessource(String autreRessource) {
        this.autreRessource = autreRessource;
    }

    public byte[] getDesignation() {
        return this.designation;
    }

    public MouvementMatiere designation(byte[] designation) {
        this.designation = designation;
        return this;
    }

    public void setDesignation(byte[] designation) {
        this.designation = designation;
    }

    public String getDesignationContentType() {
        return this.designationContentType;
    }

    public MouvementMatiere designationContentType(String designationContentType) {
        this.designationContentType = designationContentType;
        return this;
    }

    public void setDesignationContentType(String designationContentType) {
        this.designationContentType = designationContentType;
    }

    public byte[] getPvReception() {
        return this.pvReception;
    }

    public MouvementMatiere pvReception(byte[] pvReception) {
        this.pvReception = pvReception;
        return this;
    }

    public void setPvReception(byte[] pvReception) {
        this.pvReception = pvReception;
    }

    public String getPvReceptionContentType() {
        return this.pvReceptionContentType;
    }

    public MouvementMatiere pvReceptionContentType(String pvReceptionContentType) {
        this.pvReceptionContentType = pvReceptionContentType;
        return this;
    }

    public void setPvReceptionContentType(String pvReceptionContentType) {
        this.pvReceptionContentType = pvReceptionContentType;
    }

    public byte[] getBordeauDeLivraison() {
        return this.bordeauDeLivraison;
    }

    public MouvementMatiere bordeauDeLivraison(byte[] bordeauDeLivraison) {
        this.bordeauDeLivraison = bordeauDeLivraison;
        return this;
    }

    public void setBordeauDeLivraison(byte[] bordeauDeLivraison) {
        this.bordeauDeLivraison = bordeauDeLivraison;
    }

    public String getBordeauDeLivraisonContentType() {
        return this.bordeauDeLivraisonContentType;
    }

    public MouvementMatiere bordeauDeLivraisonContentType(String bordeauDeLivraisonContentType) {
        this.bordeauDeLivraisonContentType = bordeauDeLivraisonContentType;
        return this;
    }

    public void setBordeauDeLivraisonContentType(String bordeauDeLivraisonContentType) {
        this.bordeauDeLivraisonContentType = bordeauDeLivraisonContentType;
    }

    public Groupe getGroupe() {
        return this.groupe;
    }

    public MouvementMatiere groupe(Groupe groupe) {
        this.groupe = groupe;
        return this;
    }

    public void setGroupe(Groupe groupe) {
        this.groupe = groupe;
    }

    public byte[] getBonDeSortie() {
        return this.bonDeSortie;
    }

    public MouvementMatiere bonDeSortie(byte[] bonDeSortie) {
        this.bonDeSortie = bonDeSortie;
        return this;
    }

    public void setBonDeSortie(byte[] bonDeSortie) {
        this.bonDeSortie = bonDeSortie;
    }

    public String getBonDeSortieContentType() {
        return this.bonDeSortieContentType;
    }

    public MouvementMatiere bonDeSortieContentType(String bonDeSortieContentType) {
        this.bonDeSortieContentType = bonDeSortieContentType;
        return this;
    }

    public void setBonDeSortieContentType(String bonDeSortieContentType) {
        this.bonDeSortieContentType = bonDeSortieContentType;
    }

    public byte[] getCertificatAdministratif() {
        return this.certificatAdministratif;
    }

    public MouvementMatiere certificatAdministratif(byte[] certificatAdministratif) {
        this.certificatAdministratif = certificatAdministratif;
        return this;
    }

    public void setCertificatAdministratif(byte[] certificatAdministratif) {
        this.certificatAdministratif = certificatAdministratif;
    }

    public String getCertificatAdministratifContentType() {
        return this.certificatAdministratifContentType;
    }

    public MouvementMatiere certificatAdministratifContentType(String certificatAdministratifContentType) {
        this.certificatAdministratifContentType = certificatAdministratifContentType;
        return this;
    }

    public void setCertificatAdministratifContentType(String certificatAdministratifContentType) {
        this.certificatAdministratifContentType = certificatAdministratifContentType;
    }

    public LyceesTechniques getLyceesTechniques() {
        return this.lyceesTechniques;
    }

    public MouvementMatiere lyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.setLyceesTechniques(lyceesTechniques);
        return this;
    }

    public void setLyceesTechniques(LyceesTechniques lyceesTechniques) {
        this.lyceesTechniques = lyceesTechniques;
    }

    public ComptableMatiere getComptableMatiere() {
        return this.comptableMatiere;
    }

    public MouvementMatiere comptableMatiere(ComptableMatiere comptableMatiere) {
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
        if (!(o instanceof MouvementMatiere)) {
            return false;
        }
        return id != null && id.equals(((MouvementMatiere) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MouvementMatiere{" +
            "id=" + getId() +
            ", typeMouvement='" + getTypeMouvement() + "'" +
            ", group='" + getGroup() + "'" +
            ", organisation='" + getOrganisation() + "'" +
            ", autreOrganisation='" + getAutreOrganisation() + "'" +
            ", ressource='" + getRessource() + "'" +
            ", autreRessource='" + getAutreRessource() + "'" +
            ", designation='" + getDesignation() + "'" +
            ", designationContentType='" + getDesignationContentType() + "'" +
            ", pvReception='" + getPvReception() + "'" +
            ", pvReceptionContentType='" + getPvReceptionContentType() + "'" +
            ", bordeauDeLivraison='" + getBordeauDeLivraison() + "'" +
            ", bordeauDeLivraisonContentType='" + getBordeauDeLivraisonContentType() + "'" +
            ", groupe='" + getGroupe() + "'" +
            ", bonDeSortie='" + getBonDeSortie() + "'" +
            ", bonDeSortieContentType='" + getBonDeSortieContentType() + "'" +
            ", certificatAdministratif='" + getCertificatAdministratif() + "'" +
            ", certificatAdministratifContentType='" + getCertificatAdministratifContentType() + "'" +
            "}";
    }
}
