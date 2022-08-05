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
import mefpai.gouv.sn.domain.Attribution;
import mefpai.gouv.sn.repository.AttributionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link AttributionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AttributionResourceIT {

    private static final String DEFAULT_BENEFICIAIRE = "AAAAAAAAAA";
    private static final String UPDATED_BENEFICIAIRE = "BBBBBBBBBB";

    private static final String DEFAULT_FONCTION = "AAAAAAAAAA";
    private static final String UPDATED_FONCTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/attributions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AttributionRepository attributionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAttributionMockMvc;

    private Attribution attribution;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Attribution createEntity(EntityManager em) {
        Attribution attribution = new Attribution().beneficiaire(DEFAULT_BENEFICIAIRE).fonction(DEFAULT_FONCTION).date(DEFAULT_DATE);
        return attribution;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Attribution createUpdatedEntity(EntityManager em) {
        Attribution attribution = new Attribution().beneficiaire(UPDATED_BENEFICIAIRE).fonction(UPDATED_FONCTION).date(UPDATED_DATE);
        return attribution;
    }

    @BeforeEach
    public void initTest() {
        attribution = createEntity(em);
    }

    @Test
    @Transactional
    void createAttribution() throws Exception {
        int databaseSizeBeforeCreate = attributionRepository.findAll().size();
        // Create the Attribution
        restAttributionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(attribution)))
            .andExpect(status().isCreated());

        // Validate the Attribution in the database
        List<Attribution> attributionList = attributionRepository.findAll();
        assertThat(attributionList).hasSize(databaseSizeBeforeCreate + 1);
        Attribution testAttribution = attributionList.get(attributionList.size() - 1);
        assertThat(testAttribution.getBeneficiaire()).isEqualTo(DEFAULT_BENEFICIAIRE);
        assertThat(testAttribution.getFonction()).isEqualTo(DEFAULT_FONCTION);
        assertThat(testAttribution.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    void createAttributionWithExistingId() throws Exception {
        // Create the Attribution with an existing ID
        attribution.setId(1L);

        int databaseSizeBeforeCreate = attributionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAttributionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(attribution)))
            .andExpect(status().isBadRequest());

        // Validate the Attribution in the database
        List<Attribution> attributionList = attributionRepository.findAll();
        assertThat(attributionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkBeneficiaireIsRequired() throws Exception {
        int databaseSizeBeforeTest = attributionRepository.findAll().size();
        // set the field null
        attribution.setBeneficiaire(null);

        // Create the Attribution, which fails.

        restAttributionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(attribution)))
            .andExpect(status().isBadRequest());

        List<Attribution> attributionList = attributionRepository.findAll();
        assertThat(attributionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkFonctionIsRequired() throws Exception {
        int databaseSizeBeforeTest = attributionRepository.findAll().size();
        // set the field null
        attribution.setFonction(null);

        // Create the Attribution, which fails.

        restAttributionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(attribution)))
            .andExpect(status().isBadRequest());

        List<Attribution> attributionList = attributionRepository.findAll();
        assertThat(attributionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = attributionRepository.findAll().size();
        // set the field null
        attribution.setDate(null);

        // Create the Attribution, which fails.

        restAttributionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(attribution)))
            .andExpect(status().isBadRequest());

        List<Attribution> attributionList = attributionRepository.findAll();
        assertThat(attributionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllAttributions() throws Exception {
        // Initialize the database
        attributionRepository.saveAndFlush(attribution);

        // Get all the attributionList
        restAttributionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(attribution.getId().intValue())))
            .andExpect(jsonPath("$.[*].beneficiaire").value(hasItem(DEFAULT_BENEFICIAIRE)))
            .andExpect(jsonPath("$.[*].fonction").value(hasItem(DEFAULT_FONCTION)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    void getAttribution() throws Exception {
        // Initialize the database
        attributionRepository.saveAndFlush(attribution);

        // Get the attribution
        restAttributionMockMvc
            .perform(get(ENTITY_API_URL_ID, attribution.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(attribution.getId().intValue()))
            .andExpect(jsonPath("$.beneficiaire").value(DEFAULT_BENEFICIAIRE))
            .andExpect(jsonPath("$.fonction").value(DEFAULT_FONCTION))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingAttribution() throws Exception {
        // Get the attribution
        restAttributionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewAttribution() throws Exception {
        // Initialize the database
        attributionRepository.saveAndFlush(attribution);

        int databaseSizeBeforeUpdate = attributionRepository.findAll().size();

        // Update the attribution
        Attribution updatedAttribution = attributionRepository.findById(attribution.getId()).get();
        // Disconnect from session so that the updates on updatedAttribution are not directly saved in db
        em.detach(updatedAttribution);
        updatedAttribution.beneficiaire(UPDATED_BENEFICIAIRE).fonction(UPDATED_FONCTION).date(UPDATED_DATE);

        restAttributionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAttribution.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAttribution))
            )
            .andExpect(status().isOk());

        // Validate the Attribution in the database
        List<Attribution> attributionList = attributionRepository.findAll();
        assertThat(attributionList).hasSize(databaseSizeBeforeUpdate);
        Attribution testAttribution = attributionList.get(attributionList.size() - 1);
        assertThat(testAttribution.getBeneficiaire()).isEqualTo(UPDATED_BENEFICIAIRE);
        assertThat(testAttribution.getFonction()).isEqualTo(UPDATED_FONCTION);
        assertThat(testAttribution.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    void putNonExistingAttribution() throws Exception {
        int databaseSizeBeforeUpdate = attributionRepository.findAll().size();
        attribution.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAttributionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, attribution.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(attribution))
            )
            .andExpect(status().isBadRequest());

        // Validate the Attribution in the database
        List<Attribution> attributionList = attributionRepository.findAll();
        assertThat(attributionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAttribution() throws Exception {
        int databaseSizeBeforeUpdate = attributionRepository.findAll().size();
        attribution.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAttributionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(attribution))
            )
            .andExpect(status().isBadRequest());

        // Validate the Attribution in the database
        List<Attribution> attributionList = attributionRepository.findAll();
        assertThat(attributionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAttribution() throws Exception {
        int databaseSizeBeforeUpdate = attributionRepository.findAll().size();
        attribution.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAttributionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(attribution)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Attribution in the database
        List<Attribution> attributionList = attributionRepository.findAll();
        assertThat(attributionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAttributionWithPatch() throws Exception {
        // Initialize the database
        attributionRepository.saveAndFlush(attribution);

        int databaseSizeBeforeUpdate = attributionRepository.findAll().size();

        // Update the attribution using partial update
        Attribution partialUpdatedAttribution = new Attribution();
        partialUpdatedAttribution.setId(attribution.getId());

        partialUpdatedAttribution.date(UPDATED_DATE);

        restAttributionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAttribution.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAttribution))
            )
            .andExpect(status().isOk());

        // Validate the Attribution in the database
        List<Attribution> attributionList = attributionRepository.findAll();
        assertThat(attributionList).hasSize(databaseSizeBeforeUpdate);
        Attribution testAttribution = attributionList.get(attributionList.size() - 1);
        assertThat(testAttribution.getBeneficiaire()).isEqualTo(DEFAULT_BENEFICIAIRE);
        assertThat(testAttribution.getFonction()).isEqualTo(DEFAULT_FONCTION);
        assertThat(testAttribution.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    void fullUpdateAttributionWithPatch() throws Exception {
        // Initialize the database
        attributionRepository.saveAndFlush(attribution);

        int databaseSizeBeforeUpdate = attributionRepository.findAll().size();

        // Update the attribution using partial update
        Attribution partialUpdatedAttribution = new Attribution();
        partialUpdatedAttribution.setId(attribution.getId());

        partialUpdatedAttribution.beneficiaire(UPDATED_BENEFICIAIRE).fonction(UPDATED_FONCTION).date(UPDATED_DATE);

        restAttributionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAttribution.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAttribution))
            )
            .andExpect(status().isOk());

        // Validate the Attribution in the database
        List<Attribution> attributionList = attributionRepository.findAll();
        assertThat(attributionList).hasSize(databaseSizeBeforeUpdate);
        Attribution testAttribution = attributionList.get(attributionList.size() - 1);
        assertThat(testAttribution.getBeneficiaire()).isEqualTo(UPDATED_BENEFICIAIRE);
        assertThat(testAttribution.getFonction()).isEqualTo(UPDATED_FONCTION);
        assertThat(testAttribution.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    void patchNonExistingAttribution() throws Exception {
        int databaseSizeBeforeUpdate = attributionRepository.findAll().size();
        attribution.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAttributionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, attribution.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(attribution))
            )
            .andExpect(status().isBadRequest());

        // Validate the Attribution in the database
        List<Attribution> attributionList = attributionRepository.findAll();
        assertThat(attributionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAttribution() throws Exception {
        int databaseSizeBeforeUpdate = attributionRepository.findAll().size();
        attribution.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAttributionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(attribution))
            )
            .andExpect(status().isBadRequest());

        // Validate the Attribution in the database
        List<Attribution> attributionList = attributionRepository.findAll();
        assertThat(attributionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAttribution() throws Exception {
        int databaseSizeBeforeUpdate = attributionRepository.findAll().size();
        attribution.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAttributionMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(attribution))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Attribution in the database
        List<Attribution> attributionList = attributionRepository.findAll();
        assertThat(attributionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAttribution() throws Exception {
        // Initialize the database
        attributionRepository.saveAndFlush(attribution);

        int databaseSizeBeforeDelete = attributionRepository.findAll().size();

        // Delete the attribution
        restAttributionMockMvc
            .perform(delete(ENTITY_API_URL_ID, attribution.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Attribution> attributionList = attributionRepository.findAll();
        assertThat(attributionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
