package mefpai.gouv.sn.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import mefpai.gouv.sn.IntegrationTest;
import mefpai.gouv.sn.domain.OrganeGestion;
import mefpai.gouv.sn.domain.enumeration.Fonctionnment;
import mefpai.gouv.sn.domain.enumeration.TypeO;
import mefpai.gouv.sn.repository.OrganeGestionRepository;
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
 * Integration tests for the {@link OrganeGestionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OrganeGestionResourceIT {

    private static final TypeO DEFAULT_TYPE = TypeO.CONSEIL_ADMINISTRATION;
    private static final TypeO UPDATED_TYPE = TypeO.CONSEIL_ETABLISSEMENT;

    private static final String DEFAULT_AUTRE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_AUTRE_TYPE = "BBBBBBBBBB";

    private static final Fonctionnment DEFAULT_FONCTIONNEL = Fonctionnment.OUI;
    private static final Fonctionnment UPDATED_FONCTIONNEL = Fonctionnment.NON;

    private static final String DEFAULT_ACTIVITE = "AAAAAAAAAA";
    private static final String UPDATED_ACTIVITE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_ACTIVITE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_ACTIVITE = LocalDate.now(ZoneId.systemDefault());

    private static final byte[] DEFAULT_RAPPORT = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_RAPPORT = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_RAPPORT_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_RAPPORT_CONTENT_TYPE = "image/png";

    private static final String ENTITY_API_URL = "/api/organe-gestions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OrganeGestionRepository organeGestionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOrganeGestionMockMvc;

    private OrganeGestion organeGestion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrganeGestion createEntity(EntityManager em) {
        OrganeGestion organeGestion = new OrganeGestion()
            .type(DEFAULT_TYPE)
            .autreType(DEFAULT_AUTRE_TYPE)
            .fonctionnel(DEFAULT_FONCTIONNEL)
            .activite(DEFAULT_ACTIVITE)
            .dateActivite(DEFAULT_DATE_ACTIVITE)
            .rapport(DEFAULT_RAPPORT)
            .rapportContentType(DEFAULT_RAPPORT_CONTENT_TYPE);
        return organeGestion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrganeGestion createUpdatedEntity(EntityManager em) {
        OrganeGestion organeGestion = new OrganeGestion()
            .type(UPDATED_TYPE)
            .autreType(UPDATED_AUTRE_TYPE)
            .fonctionnel(UPDATED_FONCTIONNEL)
            .activite(UPDATED_ACTIVITE)
            .dateActivite(UPDATED_DATE_ACTIVITE)
            .rapport(UPDATED_RAPPORT)
            .rapportContentType(UPDATED_RAPPORT_CONTENT_TYPE);
        return organeGestion;
    }

    @BeforeEach
    public void initTest() {
        organeGestion = createEntity(em);
    }

    @Test
    @Transactional
    void createOrganeGestion() throws Exception {
        int databaseSizeBeforeCreate = organeGestionRepository.findAll().size();
        // Create the OrganeGestion
        restOrganeGestionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(organeGestion)))
            .andExpect(status().isCreated());

        // Validate the OrganeGestion in the database
        List<OrganeGestion> organeGestionList = organeGestionRepository.findAll();
        assertThat(organeGestionList).hasSize(databaseSizeBeforeCreate + 1);
        OrganeGestion testOrganeGestion = organeGestionList.get(organeGestionList.size() - 1);
        assertThat(testOrganeGestion.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testOrganeGestion.getAutreType()).isEqualTo(DEFAULT_AUTRE_TYPE);
        assertThat(testOrganeGestion.getFonctionnel()).isEqualTo(DEFAULT_FONCTIONNEL);
        assertThat(testOrganeGestion.getActivite()).isEqualTo(DEFAULT_ACTIVITE);
        assertThat(testOrganeGestion.getDateActivite()).isEqualTo(DEFAULT_DATE_ACTIVITE);
        assertThat(testOrganeGestion.getRapport()).isEqualTo(DEFAULT_RAPPORT);
        assertThat(testOrganeGestion.getRapportContentType()).isEqualTo(DEFAULT_RAPPORT_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void createOrganeGestionWithExistingId() throws Exception {
        // Create the OrganeGestion with an existing ID
        organeGestion.setId(1L);

        int databaseSizeBeforeCreate = organeGestionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrganeGestionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(organeGestion)))
            .andExpect(status().isBadRequest());

        // Validate the OrganeGestion in the database
        List<OrganeGestion> organeGestionList = organeGestionRepository.findAll();
        assertThat(organeGestionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = organeGestionRepository.findAll().size();
        // set the field null
        organeGestion.setType(null);

        // Create the OrganeGestion, which fails.

        restOrganeGestionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(organeGestion)))
            .andExpect(status().isBadRequest());

        List<OrganeGestion> organeGestionList = organeGestionRepository.findAll();
        assertThat(organeGestionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDateActiviteIsRequired() throws Exception {
        int databaseSizeBeforeTest = organeGestionRepository.findAll().size();
        // set the field null
        organeGestion.setDateActivite(null);

        // Create the OrganeGestion, which fails.

        restOrganeGestionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(organeGestion)))
            .andExpect(status().isBadRequest());

        List<OrganeGestion> organeGestionList = organeGestionRepository.findAll();
        assertThat(organeGestionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllOrganeGestions() throws Exception {
        // Initialize the database
        organeGestionRepository.saveAndFlush(organeGestion);

        // Get all the organeGestionList
        restOrganeGestionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(organeGestion.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].autreType").value(hasItem(DEFAULT_AUTRE_TYPE)))
            .andExpect(jsonPath("$.[*].fonctionnel").value(hasItem(DEFAULT_FONCTIONNEL.toString())))
            .andExpect(jsonPath("$.[*].activite").value(hasItem(DEFAULT_ACTIVITE.toString())))
            .andExpect(jsonPath("$.[*].dateActivite").value(hasItem(DEFAULT_DATE_ACTIVITE.toString())))
            .andExpect(jsonPath("$.[*].rapportContentType").value(hasItem(DEFAULT_RAPPORT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].rapport").value(hasItem(Base64Utils.encodeToString(DEFAULT_RAPPORT))));
    }

    @Test
    @Transactional
    void getOrganeGestion() throws Exception {
        // Initialize the database
        organeGestionRepository.saveAndFlush(organeGestion);

        // Get the organeGestion
        restOrganeGestionMockMvc
            .perform(get(ENTITY_API_URL_ID, organeGestion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(organeGestion.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.autreType").value(DEFAULT_AUTRE_TYPE))
            .andExpect(jsonPath("$.fonctionnel").value(DEFAULT_FONCTIONNEL.toString()))
            .andExpect(jsonPath("$.activite").value(DEFAULT_ACTIVITE.toString()))
            .andExpect(jsonPath("$.dateActivite").value(DEFAULT_DATE_ACTIVITE.toString()))
            .andExpect(jsonPath("$.rapportContentType").value(DEFAULT_RAPPORT_CONTENT_TYPE))
            .andExpect(jsonPath("$.rapport").value(Base64Utils.encodeToString(DEFAULT_RAPPORT)));
    }

    @Test
    @Transactional
    void getNonExistingOrganeGestion() throws Exception {
        // Get the organeGestion
        restOrganeGestionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewOrganeGestion() throws Exception {
        // Initialize the database
        organeGestionRepository.saveAndFlush(organeGestion);

        int databaseSizeBeforeUpdate = organeGestionRepository.findAll().size();

        // Update the organeGestion
        OrganeGestion updatedOrganeGestion = organeGestionRepository.findById(organeGestion.getId()).get();
        // Disconnect from session so that the updates on updatedOrganeGestion are not directly saved in db
        em.detach(updatedOrganeGestion);
        updatedOrganeGestion
            .type(UPDATED_TYPE)
            .autreType(UPDATED_AUTRE_TYPE)
            .fonctionnel(UPDATED_FONCTIONNEL)
            .activite(UPDATED_ACTIVITE)
            .dateActivite(UPDATED_DATE_ACTIVITE)
            .rapport(UPDATED_RAPPORT)
            .rapportContentType(UPDATED_RAPPORT_CONTENT_TYPE);

        restOrganeGestionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOrganeGestion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedOrganeGestion))
            )
            .andExpect(status().isOk());

        // Validate the OrganeGestion in the database
        List<OrganeGestion> organeGestionList = organeGestionRepository.findAll();
        assertThat(organeGestionList).hasSize(databaseSizeBeforeUpdate);
        OrganeGestion testOrganeGestion = organeGestionList.get(organeGestionList.size() - 1);
        assertThat(testOrganeGestion.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testOrganeGestion.getAutreType()).isEqualTo(UPDATED_AUTRE_TYPE);
        assertThat(testOrganeGestion.getFonctionnel()).isEqualTo(UPDATED_FONCTIONNEL);
        assertThat(testOrganeGestion.getActivite()).isEqualTo(UPDATED_ACTIVITE);
        assertThat(testOrganeGestion.getDateActivite()).isEqualTo(UPDATED_DATE_ACTIVITE);
        assertThat(testOrganeGestion.getRapport()).isEqualTo(UPDATED_RAPPORT);
        assertThat(testOrganeGestion.getRapportContentType()).isEqualTo(UPDATED_RAPPORT_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingOrganeGestion() throws Exception {
        int databaseSizeBeforeUpdate = organeGestionRepository.findAll().size();
        organeGestion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrganeGestionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, organeGestion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(organeGestion))
            )
            .andExpect(status().isBadRequest());

        // Validate the OrganeGestion in the database
        List<OrganeGestion> organeGestionList = organeGestionRepository.findAll();
        assertThat(organeGestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOrganeGestion() throws Exception {
        int databaseSizeBeforeUpdate = organeGestionRepository.findAll().size();
        organeGestion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrganeGestionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(organeGestion))
            )
            .andExpect(status().isBadRequest());

        // Validate the OrganeGestion in the database
        List<OrganeGestion> organeGestionList = organeGestionRepository.findAll();
        assertThat(organeGestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOrganeGestion() throws Exception {
        int databaseSizeBeforeUpdate = organeGestionRepository.findAll().size();
        organeGestion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrganeGestionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(organeGestion)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the OrganeGestion in the database
        List<OrganeGestion> organeGestionList = organeGestionRepository.findAll();
        assertThat(organeGestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOrganeGestionWithPatch() throws Exception {
        // Initialize the database
        organeGestionRepository.saveAndFlush(organeGestion);

        int databaseSizeBeforeUpdate = organeGestionRepository.findAll().size();

        // Update the organeGestion using partial update
        OrganeGestion partialUpdatedOrganeGestion = new OrganeGestion();
        partialUpdatedOrganeGestion.setId(organeGestion.getId());

        partialUpdatedOrganeGestion
            .type(UPDATED_TYPE)
            .autreType(UPDATED_AUTRE_TYPE)
            .fonctionnel(UPDATED_FONCTIONNEL)
            .activite(UPDATED_ACTIVITE)
            .rapport(UPDATED_RAPPORT)
            .rapportContentType(UPDATED_RAPPORT_CONTENT_TYPE);

        restOrganeGestionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOrganeGestion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOrganeGestion))
            )
            .andExpect(status().isOk());

        // Validate the OrganeGestion in the database
        List<OrganeGestion> organeGestionList = organeGestionRepository.findAll();
        assertThat(organeGestionList).hasSize(databaseSizeBeforeUpdate);
        OrganeGestion testOrganeGestion = organeGestionList.get(organeGestionList.size() - 1);
        assertThat(testOrganeGestion.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testOrganeGestion.getAutreType()).isEqualTo(UPDATED_AUTRE_TYPE);
        assertThat(testOrganeGestion.getFonctionnel()).isEqualTo(UPDATED_FONCTIONNEL);
        assertThat(testOrganeGestion.getActivite()).isEqualTo(UPDATED_ACTIVITE);
        assertThat(testOrganeGestion.getDateActivite()).isEqualTo(DEFAULT_DATE_ACTIVITE);
        assertThat(testOrganeGestion.getRapport()).isEqualTo(UPDATED_RAPPORT);
        assertThat(testOrganeGestion.getRapportContentType()).isEqualTo(UPDATED_RAPPORT_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateOrganeGestionWithPatch() throws Exception {
        // Initialize the database
        organeGestionRepository.saveAndFlush(organeGestion);

        int databaseSizeBeforeUpdate = organeGestionRepository.findAll().size();

        // Update the organeGestion using partial update
        OrganeGestion partialUpdatedOrganeGestion = new OrganeGestion();
        partialUpdatedOrganeGestion.setId(organeGestion.getId());

        partialUpdatedOrganeGestion
            .type(UPDATED_TYPE)
            .autreType(UPDATED_AUTRE_TYPE)
            .fonctionnel(UPDATED_FONCTIONNEL)
            .activite(UPDATED_ACTIVITE)
            .dateActivite(UPDATED_DATE_ACTIVITE)
            .rapport(UPDATED_RAPPORT)
            .rapportContentType(UPDATED_RAPPORT_CONTENT_TYPE);

        restOrganeGestionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOrganeGestion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOrganeGestion))
            )
            .andExpect(status().isOk());

        // Validate the OrganeGestion in the database
        List<OrganeGestion> organeGestionList = organeGestionRepository.findAll();
        assertThat(organeGestionList).hasSize(databaseSizeBeforeUpdate);
        OrganeGestion testOrganeGestion = organeGestionList.get(organeGestionList.size() - 1);
        assertThat(testOrganeGestion.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testOrganeGestion.getAutreType()).isEqualTo(UPDATED_AUTRE_TYPE);
        assertThat(testOrganeGestion.getFonctionnel()).isEqualTo(UPDATED_FONCTIONNEL);
        assertThat(testOrganeGestion.getActivite()).isEqualTo(UPDATED_ACTIVITE);
        assertThat(testOrganeGestion.getDateActivite()).isEqualTo(UPDATED_DATE_ACTIVITE);
        assertThat(testOrganeGestion.getRapport()).isEqualTo(UPDATED_RAPPORT);
        assertThat(testOrganeGestion.getRapportContentType()).isEqualTo(UPDATED_RAPPORT_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingOrganeGestion() throws Exception {
        int databaseSizeBeforeUpdate = organeGestionRepository.findAll().size();
        organeGestion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrganeGestionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, organeGestion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(organeGestion))
            )
            .andExpect(status().isBadRequest());

        // Validate the OrganeGestion in the database
        List<OrganeGestion> organeGestionList = organeGestionRepository.findAll();
        assertThat(organeGestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOrganeGestion() throws Exception {
        int databaseSizeBeforeUpdate = organeGestionRepository.findAll().size();
        organeGestion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrganeGestionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(organeGestion))
            )
            .andExpect(status().isBadRequest());

        // Validate the OrganeGestion in the database
        List<OrganeGestion> organeGestionList = organeGestionRepository.findAll();
        assertThat(organeGestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOrganeGestion() throws Exception {
        int databaseSizeBeforeUpdate = organeGestionRepository.findAll().size();
        organeGestion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrganeGestionMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(organeGestion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the OrganeGestion in the database
        List<OrganeGestion> organeGestionList = organeGestionRepository.findAll();
        assertThat(organeGestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOrganeGestion() throws Exception {
        // Initialize the database
        organeGestionRepository.saveAndFlush(organeGestion);

        int databaseSizeBeforeDelete = organeGestionRepository.findAll().size();

        // Delete the organeGestion
        restOrganeGestionMockMvc
            .perform(delete(ENTITY_API_URL_ID, organeGestion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OrganeGestion> organeGestionList = organeGestionRepository.findAll();
        assertThat(organeGestionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
