package mefpai.gouv.sn.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import mefpai.gouv.sn.IntegrationTest;
import mefpai.gouv.sn.domain.MouvementMatiere;
import mefpai.gouv.sn.domain.enumeration.Group;
import mefpai.gouv.sn.domain.enumeration.Groupe;
import mefpai.gouv.sn.domain.enumeration.Mouvement;
import mefpai.gouv.sn.domain.enumeration.Organisation;
import mefpai.gouv.sn.domain.enumeration.Ressouces;
import mefpai.gouv.sn.repository.MouvementMatiereRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link MouvementMatiereResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MouvementMatiereResourceIT {

    private static final Mouvement DEFAULT_TYPE_MOUVEMENT = Mouvement.RECEPTION;
    private static final Mouvement UPDATED_TYPE_MOUVEMENT = Mouvement.SORTIE_DEFINITIVE;

    private static final Group DEFAULT_GROUP = Group.GROUP1;
    private static final Group UPDATED_GROUP = Group.GROUP2;

    private static final Organisation DEFAULT_ORGANISATION = Organisation.ETAT;
    private static final Organisation UPDATED_ORGANISATION = Organisation.PATENAIRE;

    private static final String DEFAULT_AUTRE_ORGANISATION = "AAAAAAAAAA";
    private static final String UPDATED_AUTRE_ORGANISATION = "BBBBBBBBBB";

    private static final Ressouces DEFAULT_RESSOURCE = Ressouces.BUDGET;
    private static final Ressouces UPDATED_RESSOURCE = Ressouces.AUTRES;

    private static final String DEFAULT_AUTRE_RESSOURCE = "AAAAAAAAAA";
    private static final String UPDATED_AUTRE_RESSOURCE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_DESIGNATION = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_DESIGNATION = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_DESIGNATION_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_DESIGNATION_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_PV_RECEPTION = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PV_RECEPTION = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PV_RECEPTION_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PV_RECEPTION_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_BORDEAU_DE_LIVRAISON = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_BORDEAU_DE_LIVRAISON = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_BORDEAU_DE_LIVRAISON_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_BORDEAU_DE_LIVRAISON_CONTENT_TYPE = "image/png";

    private static final Groupe DEFAULT_GROUPE = Groupe.GROUPE1;
    private static final Groupe UPDATED_GROUPE = Groupe.GROUPE2;

    private static final byte[] DEFAULT_BON_DE_SORTIE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_BON_DE_SORTIE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_BON_DE_SORTIE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_BON_DE_SORTIE_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_CERTIFICAT_ADMINISTRATIF = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_CERTIFICAT_ADMINISTRATIF = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE = "image/png";

    private static final String ENTITY_API_URL = "/api/mouvement-matieres";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MouvementMatiereRepository mouvementMatiereRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMouvementMatiereMockMvc;

    private MouvementMatiere mouvementMatiere;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MouvementMatiere createEntity(EntityManager em) {
        MouvementMatiere mouvementMatiere = new MouvementMatiere()
            .typeMouvement(DEFAULT_TYPE_MOUVEMENT)
            .group(DEFAULT_GROUP)
            .organisation(DEFAULT_ORGANISATION)
            .autreOrganisation(DEFAULT_AUTRE_ORGANISATION)
            .ressource(DEFAULT_RESSOURCE)
            .autreRessource(DEFAULT_AUTRE_RESSOURCE)
            .designation(DEFAULT_DESIGNATION)
            .designationContentType(DEFAULT_DESIGNATION_CONTENT_TYPE)
            .pvReception(DEFAULT_PV_RECEPTION)
            .pvReceptionContentType(DEFAULT_PV_RECEPTION_CONTENT_TYPE)
            .bordeauDeLivraison(DEFAULT_BORDEAU_DE_LIVRAISON)
            .bordeauDeLivraisonContentType(DEFAULT_BORDEAU_DE_LIVRAISON_CONTENT_TYPE)
            .groupe(DEFAULT_GROUPE)
            .bonDeSortie(DEFAULT_BON_DE_SORTIE)
            .bonDeSortieContentType(DEFAULT_BON_DE_SORTIE_CONTENT_TYPE)
            .certificatAdministratif(DEFAULT_CERTIFICAT_ADMINISTRATIF)
            .certificatAdministratifContentType(DEFAULT_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE);
        return mouvementMatiere;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MouvementMatiere createUpdatedEntity(EntityManager em) {
        MouvementMatiere mouvementMatiere = new MouvementMatiere()
            .typeMouvement(UPDATED_TYPE_MOUVEMENT)
            .group(UPDATED_GROUP)
            .organisation(UPDATED_ORGANISATION)
            .autreOrganisation(UPDATED_AUTRE_ORGANISATION)
            .ressource(UPDATED_RESSOURCE)
            .autreRessource(UPDATED_AUTRE_RESSOURCE)
            .designation(UPDATED_DESIGNATION)
            .designationContentType(UPDATED_DESIGNATION_CONTENT_TYPE)
            .pvReception(UPDATED_PV_RECEPTION)
            .pvReceptionContentType(UPDATED_PV_RECEPTION_CONTENT_TYPE)
            .bordeauDeLivraison(UPDATED_BORDEAU_DE_LIVRAISON)
            .bordeauDeLivraisonContentType(UPDATED_BORDEAU_DE_LIVRAISON_CONTENT_TYPE)
            .groupe(UPDATED_GROUPE)
            .bonDeSortie(UPDATED_BON_DE_SORTIE)
            .bonDeSortieContentType(UPDATED_BON_DE_SORTIE_CONTENT_TYPE)
            .certificatAdministratif(UPDATED_CERTIFICAT_ADMINISTRATIF)
            .certificatAdministratifContentType(UPDATED_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE);
        return mouvementMatiere;
    }

    @BeforeEach
    public void initTest() {
        mouvementMatiere = createEntity(em);
    }

    @Test
    @Transactional
    void createMouvementMatiere() throws Exception {
        int databaseSizeBeforeCreate = mouvementMatiereRepository.findAll().size();
        // Create the MouvementMatiere
        restMouvementMatiereMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mouvementMatiere))
            )
            .andExpect(status().isCreated());

        // Validate the MouvementMatiere in the database
        List<MouvementMatiere> mouvementMatiereList = mouvementMatiereRepository.findAll();
        assertThat(mouvementMatiereList).hasSize(databaseSizeBeforeCreate + 1);
        MouvementMatiere testMouvementMatiere = mouvementMatiereList.get(mouvementMatiereList.size() - 1);
        assertThat(testMouvementMatiere.getTypeMouvement()).isEqualTo(DEFAULT_TYPE_MOUVEMENT);
        assertThat(testMouvementMatiere.getGroup()).isEqualTo(DEFAULT_GROUP);
        assertThat(testMouvementMatiere.getOrganisation()).isEqualTo(DEFAULT_ORGANISATION);
        assertThat(testMouvementMatiere.getAutreOrganisation()).isEqualTo(DEFAULT_AUTRE_ORGANISATION);
        assertThat(testMouvementMatiere.getRessource()).isEqualTo(DEFAULT_RESSOURCE);
        assertThat(testMouvementMatiere.getAutreRessource()).isEqualTo(DEFAULT_AUTRE_RESSOURCE);
        assertThat(testMouvementMatiere.getDesignation()).isEqualTo(DEFAULT_DESIGNATION);
        assertThat(testMouvementMatiere.getDesignationContentType()).isEqualTo(DEFAULT_DESIGNATION_CONTENT_TYPE);
        assertThat(testMouvementMatiere.getPvReception()).isEqualTo(DEFAULT_PV_RECEPTION);
        assertThat(testMouvementMatiere.getPvReceptionContentType()).isEqualTo(DEFAULT_PV_RECEPTION_CONTENT_TYPE);
        assertThat(testMouvementMatiere.getBordeauDeLivraison()).isEqualTo(DEFAULT_BORDEAU_DE_LIVRAISON);
        assertThat(testMouvementMatiere.getBordeauDeLivraisonContentType()).isEqualTo(DEFAULT_BORDEAU_DE_LIVRAISON_CONTENT_TYPE);
        assertThat(testMouvementMatiere.getGroupe()).isEqualTo(DEFAULT_GROUPE);
        assertThat(testMouvementMatiere.getBonDeSortie()).isEqualTo(DEFAULT_BON_DE_SORTIE);
        assertThat(testMouvementMatiere.getBonDeSortieContentType()).isEqualTo(DEFAULT_BON_DE_SORTIE_CONTENT_TYPE);
        assertThat(testMouvementMatiere.getCertificatAdministratif()).isEqualTo(DEFAULT_CERTIFICAT_ADMINISTRATIF);
        assertThat(testMouvementMatiere.getCertificatAdministratifContentType()).isEqualTo(DEFAULT_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void createMouvementMatiereWithExistingId() throws Exception {
        // Create the MouvementMatiere with an existing ID
        mouvementMatiere.setId(1L);

        int databaseSizeBeforeCreate = mouvementMatiereRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMouvementMatiereMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mouvementMatiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the MouvementMatiere in the database
        List<MouvementMatiere> mouvementMatiereList = mouvementMatiereRepository.findAll();
        assertThat(mouvementMatiereList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMouvementMatieres() throws Exception {
        // Initialize the database
        mouvementMatiereRepository.saveAndFlush(mouvementMatiere);

        // Get all the mouvementMatiereList
        restMouvementMatiereMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mouvementMatiere.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeMouvement").value(hasItem(DEFAULT_TYPE_MOUVEMENT.toString())))
            .andExpect(jsonPath("$.[*].group").value(hasItem(DEFAULT_GROUP.toString())))
            .andExpect(jsonPath("$.[*].organisation").value(hasItem(DEFAULT_ORGANISATION.toString())))
            .andExpect(jsonPath("$.[*].autreOrganisation").value(hasItem(DEFAULT_AUTRE_ORGANISATION)))
            .andExpect(jsonPath("$.[*].ressource").value(hasItem(DEFAULT_RESSOURCE.toString())))
            .andExpect(jsonPath("$.[*].autreRessource").value(hasItem(DEFAULT_AUTRE_RESSOURCE)))
            .andExpect(jsonPath("$.[*].designationContentType").value(hasItem(DEFAULT_DESIGNATION_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].designation").value(hasItem(Base64Utils.encodeToString(DEFAULT_DESIGNATION))))
            .andExpect(jsonPath("$.[*].pvReceptionContentType").value(hasItem(DEFAULT_PV_RECEPTION_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].pvReception").value(hasItem(Base64Utils.encodeToString(DEFAULT_PV_RECEPTION))))
            .andExpect(jsonPath("$.[*].bordeauDeLivraisonContentType").value(hasItem(DEFAULT_BORDEAU_DE_LIVRAISON_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].bordeauDeLivraison").value(hasItem(Base64Utils.encodeToString(DEFAULT_BORDEAU_DE_LIVRAISON))))
            .andExpect(jsonPath("$.[*].groupe").value(hasItem(DEFAULT_GROUPE.toString())))
            .andExpect(jsonPath("$.[*].bonDeSortieContentType").value(hasItem(DEFAULT_BON_DE_SORTIE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].bonDeSortie").value(hasItem(Base64Utils.encodeToString(DEFAULT_BON_DE_SORTIE))))
            .andExpect(jsonPath("$.[*].certificatAdministratifContentType").value(hasItem(DEFAULT_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE)))
            .andExpect(
                jsonPath("$.[*].certificatAdministratif").value(hasItem(Base64Utils.encodeToString(DEFAULT_CERTIFICAT_ADMINISTRATIF)))
            );
    }

    @Test
    @Transactional
    void getMouvementMatiere() throws Exception {
        // Initialize the database
        mouvementMatiereRepository.saveAndFlush(mouvementMatiere);

        // Get the mouvementMatiere
        restMouvementMatiereMockMvc
            .perform(get(ENTITY_API_URL_ID, mouvementMatiere.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(mouvementMatiere.getId().intValue()))
            .andExpect(jsonPath("$.typeMouvement").value(DEFAULT_TYPE_MOUVEMENT.toString()))
            .andExpect(jsonPath("$.group").value(DEFAULT_GROUP.toString()))
            .andExpect(jsonPath("$.organisation").value(DEFAULT_ORGANISATION.toString()))
            .andExpect(jsonPath("$.autreOrganisation").value(DEFAULT_AUTRE_ORGANISATION))
            .andExpect(jsonPath("$.ressource").value(DEFAULT_RESSOURCE.toString()))
            .andExpect(jsonPath("$.autreRessource").value(DEFAULT_AUTRE_RESSOURCE))
            .andExpect(jsonPath("$.designationContentType").value(DEFAULT_DESIGNATION_CONTENT_TYPE))
            .andExpect(jsonPath("$.designation").value(Base64Utils.encodeToString(DEFAULT_DESIGNATION)))
            .andExpect(jsonPath("$.pvReceptionContentType").value(DEFAULT_PV_RECEPTION_CONTENT_TYPE))
            .andExpect(jsonPath("$.pvReception").value(Base64Utils.encodeToString(DEFAULT_PV_RECEPTION)))
            .andExpect(jsonPath("$.bordeauDeLivraisonContentType").value(DEFAULT_BORDEAU_DE_LIVRAISON_CONTENT_TYPE))
            .andExpect(jsonPath("$.bordeauDeLivraison").value(Base64Utils.encodeToString(DEFAULT_BORDEAU_DE_LIVRAISON)))
            .andExpect(jsonPath("$.groupe").value(DEFAULT_GROUPE.toString()))
            .andExpect(jsonPath("$.bonDeSortieContentType").value(DEFAULT_BON_DE_SORTIE_CONTENT_TYPE))
            .andExpect(jsonPath("$.bonDeSortie").value(Base64Utils.encodeToString(DEFAULT_BON_DE_SORTIE)))
            .andExpect(jsonPath("$.certificatAdministratifContentType").value(DEFAULT_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE))
            .andExpect(jsonPath("$.certificatAdministratif").value(Base64Utils.encodeToString(DEFAULT_CERTIFICAT_ADMINISTRATIF)));
    }

    @Test
    @Transactional
    void getNonExistingMouvementMatiere() throws Exception {
        // Get the mouvementMatiere
        restMouvementMatiereMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMouvementMatiere() throws Exception {
        // Initialize the database
        mouvementMatiereRepository.saveAndFlush(mouvementMatiere);

        int databaseSizeBeforeUpdate = mouvementMatiereRepository.findAll().size();

        // Update the mouvementMatiere
        MouvementMatiere updatedMouvementMatiere = mouvementMatiereRepository.findById(mouvementMatiere.getId()).get();
        // Disconnect from session so that the updates on updatedMouvementMatiere are not directly saved in db
        em.detach(updatedMouvementMatiere);
        updatedMouvementMatiere
            .typeMouvement(UPDATED_TYPE_MOUVEMENT)
            .group(UPDATED_GROUP)
            .organisation(UPDATED_ORGANISATION)
            .autreOrganisation(UPDATED_AUTRE_ORGANISATION)
            .ressource(UPDATED_RESSOURCE)
            .autreRessource(UPDATED_AUTRE_RESSOURCE)
            .designation(UPDATED_DESIGNATION)
            .designationContentType(UPDATED_DESIGNATION_CONTENT_TYPE)
            .pvReception(UPDATED_PV_RECEPTION)
            .pvReceptionContentType(UPDATED_PV_RECEPTION_CONTENT_TYPE)
            .bordeauDeLivraison(UPDATED_BORDEAU_DE_LIVRAISON)
            .bordeauDeLivraisonContentType(UPDATED_BORDEAU_DE_LIVRAISON_CONTENT_TYPE)
            .groupe(UPDATED_GROUPE)
            .bonDeSortie(UPDATED_BON_DE_SORTIE)
            .bonDeSortieContentType(UPDATED_BON_DE_SORTIE_CONTENT_TYPE)
            .certificatAdministratif(UPDATED_CERTIFICAT_ADMINISTRATIF)
            .certificatAdministratifContentType(UPDATED_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE);

        restMouvementMatiereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMouvementMatiere.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMouvementMatiere))
            )
            .andExpect(status().isOk());

        // Validate the MouvementMatiere in the database
        List<MouvementMatiere> mouvementMatiereList = mouvementMatiereRepository.findAll();
        assertThat(mouvementMatiereList).hasSize(databaseSizeBeforeUpdate);
        MouvementMatiere testMouvementMatiere = mouvementMatiereList.get(mouvementMatiereList.size() - 1);
        assertThat(testMouvementMatiere.getTypeMouvement()).isEqualTo(UPDATED_TYPE_MOUVEMENT);
        assertThat(testMouvementMatiere.getGroup()).isEqualTo(UPDATED_GROUP);
        assertThat(testMouvementMatiere.getOrganisation()).isEqualTo(UPDATED_ORGANISATION);
        assertThat(testMouvementMatiere.getAutreOrganisation()).isEqualTo(UPDATED_AUTRE_ORGANISATION);
        assertThat(testMouvementMatiere.getRessource()).isEqualTo(UPDATED_RESSOURCE);
        assertThat(testMouvementMatiere.getAutreRessource()).isEqualTo(UPDATED_AUTRE_RESSOURCE);
        assertThat(testMouvementMatiere.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testMouvementMatiere.getDesignationContentType()).isEqualTo(UPDATED_DESIGNATION_CONTENT_TYPE);
        assertThat(testMouvementMatiere.getPvReception()).isEqualTo(UPDATED_PV_RECEPTION);
        assertThat(testMouvementMatiere.getPvReceptionContentType()).isEqualTo(UPDATED_PV_RECEPTION_CONTENT_TYPE);
        assertThat(testMouvementMatiere.getBordeauDeLivraison()).isEqualTo(UPDATED_BORDEAU_DE_LIVRAISON);
        assertThat(testMouvementMatiere.getBordeauDeLivraisonContentType()).isEqualTo(UPDATED_BORDEAU_DE_LIVRAISON_CONTENT_TYPE);
        assertThat(testMouvementMatiere.getGroupe()).isEqualTo(UPDATED_GROUPE);
        assertThat(testMouvementMatiere.getBonDeSortie()).isEqualTo(UPDATED_BON_DE_SORTIE);
        assertThat(testMouvementMatiere.getBonDeSortieContentType()).isEqualTo(UPDATED_BON_DE_SORTIE_CONTENT_TYPE);
        assertThat(testMouvementMatiere.getCertificatAdministratif()).isEqualTo(UPDATED_CERTIFICAT_ADMINISTRATIF);
        assertThat(testMouvementMatiere.getCertificatAdministratifContentType()).isEqualTo(UPDATED_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingMouvementMatiere() throws Exception {
        int databaseSizeBeforeUpdate = mouvementMatiereRepository.findAll().size();
        mouvementMatiere.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMouvementMatiereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, mouvementMatiere.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(mouvementMatiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the MouvementMatiere in the database
        List<MouvementMatiere> mouvementMatiereList = mouvementMatiereRepository.findAll();
        assertThat(mouvementMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMouvementMatiere() throws Exception {
        int databaseSizeBeforeUpdate = mouvementMatiereRepository.findAll().size();
        mouvementMatiere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMouvementMatiereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(mouvementMatiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the MouvementMatiere in the database
        List<MouvementMatiere> mouvementMatiereList = mouvementMatiereRepository.findAll();
        assertThat(mouvementMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMouvementMatiere() throws Exception {
        int databaseSizeBeforeUpdate = mouvementMatiereRepository.findAll().size();
        mouvementMatiere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMouvementMatiereMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mouvementMatiere))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MouvementMatiere in the database
        List<MouvementMatiere> mouvementMatiereList = mouvementMatiereRepository.findAll();
        assertThat(mouvementMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMouvementMatiereWithPatch() throws Exception {
        // Initialize the database
        mouvementMatiereRepository.saveAndFlush(mouvementMatiere);

        int databaseSizeBeforeUpdate = mouvementMatiereRepository.findAll().size();

        // Update the mouvementMatiere using partial update
        MouvementMatiere partialUpdatedMouvementMatiere = new MouvementMatiere();
        partialUpdatedMouvementMatiere.setId(mouvementMatiere.getId());

        partialUpdatedMouvementMatiere
            .organisation(UPDATED_ORGANISATION)
            .ressource(UPDATED_RESSOURCE)
            .designation(UPDATED_DESIGNATION)
            .designationContentType(UPDATED_DESIGNATION_CONTENT_TYPE)
            .pvReception(UPDATED_PV_RECEPTION)
            .pvReceptionContentType(UPDATED_PV_RECEPTION_CONTENT_TYPE)
            .bordeauDeLivraison(UPDATED_BORDEAU_DE_LIVRAISON)
            .bordeauDeLivraisonContentType(UPDATED_BORDEAU_DE_LIVRAISON_CONTENT_TYPE)
            .groupe(UPDATED_GROUPE)
            .bonDeSortie(UPDATED_BON_DE_SORTIE)
            .bonDeSortieContentType(UPDATED_BON_DE_SORTIE_CONTENT_TYPE)
            .certificatAdministratif(UPDATED_CERTIFICAT_ADMINISTRATIF)
            .certificatAdministratifContentType(UPDATED_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE);

        restMouvementMatiereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMouvementMatiere.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMouvementMatiere))
            )
            .andExpect(status().isOk());

        // Validate the MouvementMatiere in the database
        List<MouvementMatiere> mouvementMatiereList = mouvementMatiereRepository.findAll();
        assertThat(mouvementMatiereList).hasSize(databaseSizeBeforeUpdate);
        MouvementMatiere testMouvementMatiere = mouvementMatiereList.get(mouvementMatiereList.size() - 1);
        assertThat(testMouvementMatiere.getTypeMouvement()).isEqualTo(DEFAULT_TYPE_MOUVEMENT);
        assertThat(testMouvementMatiere.getGroup()).isEqualTo(DEFAULT_GROUP);
        assertThat(testMouvementMatiere.getOrganisation()).isEqualTo(UPDATED_ORGANISATION);
        assertThat(testMouvementMatiere.getAutreOrganisation()).isEqualTo(DEFAULT_AUTRE_ORGANISATION);
        assertThat(testMouvementMatiere.getRessource()).isEqualTo(UPDATED_RESSOURCE);
        assertThat(testMouvementMatiere.getAutreRessource()).isEqualTo(DEFAULT_AUTRE_RESSOURCE);
        assertThat(testMouvementMatiere.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testMouvementMatiere.getDesignationContentType()).isEqualTo(UPDATED_DESIGNATION_CONTENT_TYPE);
        assertThat(testMouvementMatiere.getPvReception()).isEqualTo(UPDATED_PV_RECEPTION);
        assertThat(testMouvementMatiere.getPvReceptionContentType()).isEqualTo(UPDATED_PV_RECEPTION_CONTENT_TYPE);
        assertThat(testMouvementMatiere.getBordeauDeLivraison()).isEqualTo(UPDATED_BORDEAU_DE_LIVRAISON);
        assertThat(testMouvementMatiere.getBordeauDeLivraisonContentType()).isEqualTo(UPDATED_BORDEAU_DE_LIVRAISON_CONTENT_TYPE);
        assertThat(testMouvementMatiere.getGroupe()).isEqualTo(UPDATED_GROUPE);
        assertThat(testMouvementMatiere.getBonDeSortie()).isEqualTo(UPDATED_BON_DE_SORTIE);
        assertThat(testMouvementMatiere.getBonDeSortieContentType()).isEqualTo(UPDATED_BON_DE_SORTIE_CONTENT_TYPE);
        assertThat(testMouvementMatiere.getCertificatAdministratif()).isEqualTo(UPDATED_CERTIFICAT_ADMINISTRATIF);
        assertThat(testMouvementMatiere.getCertificatAdministratifContentType()).isEqualTo(UPDATED_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateMouvementMatiereWithPatch() throws Exception {
        // Initialize the database
        mouvementMatiereRepository.saveAndFlush(mouvementMatiere);

        int databaseSizeBeforeUpdate = mouvementMatiereRepository.findAll().size();

        // Update the mouvementMatiere using partial update
        MouvementMatiere partialUpdatedMouvementMatiere = new MouvementMatiere();
        partialUpdatedMouvementMatiere.setId(mouvementMatiere.getId());

        partialUpdatedMouvementMatiere
            .typeMouvement(UPDATED_TYPE_MOUVEMENT)
            .group(UPDATED_GROUP)
            .organisation(UPDATED_ORGANISATION)
            .autreOrganisation(UPDATED_AUTRE_ORGANISATION)
            .ressource(UPDATED_RESSOURCE)
            .autreRessource(UPDATED_AUTRE_RESSOURCE)
            .designation(UPDATED_DESIGNATION)
            .designationContentType(UPDATED_DESIGNATION_CONTENT_TYPE)
            .pvReception(UPDATED_PV_RECEPTION)
            .pvReceptionContentType(UPDATED_PV_RECEPTION_CONTENT_TYPE)
            .bordeauDeLivraison(UPDATED_BORDEAU_DE_LIVRAISON)
            .bordeauDeLivraisonContentType(UPDATED_BORDEAU_DE_LIVRAISON_CONTENT_TYPE)
            .groupe(UPDATED_GROUPE)
            .bonDeSortie(UPDATED_BON_DE_SORTIE)
            .bonDeSortieContentType(UPDATED_BON_DE_SORTIE_CONTENT_TYPE)
            .certificatAdministratif(UPDATED_CERTIFICAT_ADMINISTRATIF)
            .certificatAdministratifContentType(UPDATED_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE);

        restMouvementMatiereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMouvementMatiere.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMouvementMatiere))
            )
            .andExpect(status().isOk());

        // Validate the MouvementMatiere in the database
        List<MouvementMatiere> mouvementMatiereList = mouvementMatiereRepository.findAll();
        assertThat(mouvementMatiereList).hasSize(databaseSizeBeforeUpdate);
        MouvementMatiere testMouvementMatiere = mouvementMatiereList.get(mouvementMatiereList.size() - 1);
        assertThat(testMouvementMatiere.getTypeMouvement()).isEqualTo(UPDATED_TYPE_MOUVEMENT);
        assertThat(testMouvementMatiere.getGroup()).isEqualTo(UPDATED_GROUP);
        assertThat(testMouvementMatiere.getOrganisation()).isEqualTo(UPDATED_ORGANISATION);
        assertThat(testMouvementMatiere.getAutreOrganisation()).isEqualTo(UPDATED_AUTRE_ORGANISATION);
        assertThat(testMouvementMatiere.getRessource()).isEqualTo(UPDATED_RESSOURCE);
        assertThat(testMouvementMatiere.getAutreRessource()).isEqualTo(UPDATED_AUTRE_RESSOURCE);
        assertThat(testMouvementMatiere.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testMouvementMatiere.getDesignationContentType()).isEqualTo(UPDATED_DESIGNATION_CONTENT_TYPE);
        assertThat(testMouvementMatiere.getPvReception()).isEqualTo(UPDATED_PV_RECEPTION);
        assertThat(testMouvementMatiere.getPvReceptionContentType()).isEqualTo(UPDATED_PV_RECEPTION_CONTENT_TYPE);
        assertThat(testMouvementMatiere.getBordeauDeLivraison()).isEqualTo(UPDATED_BORDEAU_DE_LIVRAISON);
        assertThat(testMouvementMatiere.getBordeauDeLivraisonContentType()).isEqualTo(UPDATED_BORDEAU_DE_LIVRAISON_CONTENT_TYPE);
        assertThat(testMouvementMatiere.getGroupe()).isEqualTo(UPDATED_GROUPE);
        assertThat(testMouvementMatiere.getBonDeSortie()).isEqualTo(UPDATED_BON_DE_SORTIE);
        assertThat(testMouvementMatiere.getBonDeSortieContentType()).isEqualTo(UPDATED_BON_DE_SORTIE_CONTENT_TYPE);
        assertThat(testMouvementMatiere.getCertificatAdministratif()).isEqualTo(UPDATED_CERTIFICAT_ADMINISTRATIF);
        assertThat(testMouvementMatiere.getCertificatAdministratifContentType()).isEqualTo(UPDATED_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingMouvementMatiere() throws Exception {
        int databaseSizeBeforeUpdate = mouvementMatiereRepository.findAll().size();
        mouvementMatiere.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMouvementMatiereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, mouvementMatiere.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(mouvementMatiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the MouvementMatiere in the database
        List<MouvementMatiere> mouvementMatiereList = mouvementMatiereRepository.findAll();
        assertThat(mouvementMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMouvementMatiere() throws Exception {
        int databaseSizeBeforeUpdate = mouvementMatiereRepository.findAll().size();
        mouvementMatiere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMouvementMatiereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(mouvementMatiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the MouvementMatiere in the database
        List<MouvementMatiere> mouvementMatiereList = mouvementMatiereRepository.findAll();
        assertThat(mouvementMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMouvementMatiere() throws Exception {
        int databaseSizeBeforeUpdate = mouvementMatiereRepository.findAll().size();
        mouvementMatiere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMouvementMatiereMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(mouvementMatiere))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MouvementMatiere in the database
        List<MouvementMatiere> mouvementMatiereList = mouvementMatiereRepository.findAll();
        assertThat(mouvementMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMouvementMatiere() throws Exception {
        // Initialize the database
        mouvementMatiereRepository.saveAndFlush(mouvementMatiere);

        int databaseSizeBeforeDelete = mouvementMatiereRepository.findAll().size();

        // Delete the mouvementMatiere
        restMouvementMatiereMockMvc
            .perform(delete(ENTITY_API_URL_ID, mouvementMatiere.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MouvementMatiere> mouvementMatiereList = mouvementMatiereRepository.findAll();
        assertThat(mouvementMatiereList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
