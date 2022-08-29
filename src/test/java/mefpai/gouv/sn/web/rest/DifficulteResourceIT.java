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
import mefpai.gouv.sn.domain.Difficulte;
import mefpai.gouv.sn.domain.enumeration.NatureDif;
import mefpai.gouv.sn.repository.DifficulteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

// import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link DifficulteResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DifficulteResourceIT {

    private static final NatureDif DEFAULT_NATURE = NatureDif.TECHNIQUE;
    private static final NatureDif UPDATED_NATURE = NatureDif.RH;

    private static final String DEFAULT_AUTRE_NATURE = "AAAAAAAAAA";
    private static final String UPDATED_AUTRE_NATURE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_SOLUTION = "AAAAAAAAAA";
    private static final String UPDATED_SOLUTION = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVATION = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVATION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/difficultes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DifficulteRepository difficulteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDifficulteMockMvc;

    private Difficulte difficulte;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Difficulte createEntity(EntityManager em) {
        Difficulte difficulte = new Difficulte()
            .nature(DEFAULT_NATURE)
            .autreNature(DEFAULT_AUTRE_NATURE)
            .description(DEFAULT_DESCRIPTION)
            .solution(DEFAULT_SOLUTION)
            .observation(DEFAULT_OBSERVATION);
        return difficulte;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Difficulte createUpdatedEntity(EntityManager em) {
        Difficulte difficulte = new Difficulte()
            .nature(UPDATED_NATURE)
            .autreNature(UPDATED_AUTRE_NATURE)
            .description(UPDATED_DESCRIPTION)
            .solution(UPDATED_SOLUTION)
            .observation(UPDATED_OBSERVATION);
        return difficulte;
    }

    @BeforeEach
    public void initTest() {
        difficulte = createEntity(em);
    }

    @Test
    @Transactional
    void createDifficulte() throws Exception {
        int databaseSizeBeforeCreate = difficulteRepository.findAll().size();
        // Create the Difficulte
        restDifficulteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(difficulte)))
            .andExpect(status().isCreated());

        // Validate the Difficulte in the database
        List<Difficulte> difficulteList = difficulteRepository.findAll();
        assertThat(difficulteList).hasSize(databaseSizeBeforeCreate + 1);
        Difficulte testDifficulte = difficulteList.get(difficulteList.size() - 1);
        assertThat(testDifficulte.getNature()).isEqualTo(DEFAULT_NATURE);
        assertThat(testDifficulte.getAutreNature()).isEqualTo(DEFAULT_AUTRE_NATURE);
        assertThat(testDifficulte.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testDifficulte.getSolution()).isEqualTo(DEFAULT_SOLUTION);
        assertThat(testDifficulte.getObservation()).isEqualTo(DEFAULT_OBSERVATION);
    }

    @Test
    @Transactional
    void createDifficulteWithExistingId() throws Exception {
        // Create the Difficulte with an existing ID
        difficulte.setId(1L);

        int databaseSizeBeforeCreate = difficulteRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDifficulteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(difficulte)))
            .andExpect(status().isBadRequest());

        // Validate the Difficulte in the database
        List<Difficulte> difficulteList = difficulteRepository.findAll();
        assertThat(difficulteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNatureIsRequired() throws Exception {
        int databaseSizeBeforeTest = difficulteRepository.findAll().size();
        // set the field null
        difficulte.setNature(null);

        // Create the Difficulte, which fails.

        restDifficulteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(difficulte)))
            .andExpect(status().isBadRequest());

        List<Difficulte> difficulteList = difficulteRepository.findAll();
        assertThat(difficulteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllDifficultes() throws Exception {
        // Initialize the database
        difficulteRepository.saveAndFlush(difficulte);

        // Get all the difficulteList
        restDifficulteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(difficulte.getId().intValue())))
            .andExpect(jsonPath("$.[*].nature").value(hasItem(DEFAULT_NATURE.toString())))
            .andExpect(jsonPath("$.[*].autreNature").value(hasItem(DEFAULT_AUTRE_NATURE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].solution").value(hasItem(DEFAULT_SOLUTION.toString())))
            .andExpect(jsonPath("$.[*].observation").value(hasItem(DEFAULT_OBSERVATION.toString())));
    }

    @Test
    @Transactional
    void getDifficulte() throws Exception {
        // Initialize the database
        difficulteRepository.saveAndFlush(difficulte);

        // Get the difficulte
        restDifficulteMockMvc
            .perform(get(ENTITY_API_URL_ID, difficulte.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(difficulte.getId().intValue()))
            .andExpect(jsonPath("$.nature").value(DEFAULT_NATURE.toString()))
            .andExpect(jsonPath("$.autreNature").value(DEFAULT_AUTRE_NATURE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.solution").value(DEFAULT_SOLUTION.toString()))
            .andExpect(jsonPath("$.observation").value(DEFAULT_OBSERVATION.toString()));
    }

    @Test
    @Transactional
    void getNonExistingDifficulte() throws Exception {
        // Get the difficulte
        restDifficulteMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDifficulte() throws Exception {
        // Initialize the database
        difficulteRepository.saveAndFlush(difficulte);

        int databaseSizeBeforeUpdate = difficulteRepository.findAll().size();

        // Update the difficulte
        Difficulte updatedDifficulte = difficulteRepository.findById(difficulte.getId()).get();
        // Disconnect from session so that the updates on updatedDifficulte are not directly saved in db
        em.detach(updatedDifficulte);
        updatedDifficulte
            .nature(UPDATED_NATURE)
            .autreNature(UPDATED_AUTRE_NATURE)
            .description(UPDATED_DESCRIPTION)
            .solution(UPDATED_SOLUTION)
            .observation(UPDATED_OBSERVATION);

        restDifficulteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDifficulte.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDifficulte))
            )
            .andExpect(status().isOk());

        // Validate the Difficulte in the database
        List<Difficulte> difficulteList = difficulteRepository.findAll();
        assertThat(difficulteList).hasSize(databaseSizeBeforeUpdate);
        Difficulte testDifficulte = difficulteList.get(difficulteList.size() - 1);
        assertThat(testDifficulte.getNature()).isEqualTo(UPDATED_NATURE);
        assertThat(testDifficulte.getAutreNature()).isEqualTo(UPDATED_AUTRE_NATURE);
        assertThat(testDifficulte.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testDifficulte.getSolution()).isEqualTo(UPDATED_SOLUTION);
        assertThat(testDifficulte.getObservation()).isEqualTo(UPDATED_OBSERVATION);
    }

    @Test
    @Transactional
    void putNonExistingDifficulte() throws Exception {
        int databaseSizeBeforeUpdate = difficulteRepository.findAll().size();
        difficulte.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDifficulteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, difficulte.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(difficulte))
            )
            .andExpect(status().isBadRequest());

        // Validate the Difficulte in the database
        List<Difficulte> difficulteList = difficulteRepository.findAll();
        assertThat(difficulteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDifficulte() throws Exception {
        int databaseSizeBeforeUpdate = difficulteRepository.findAll().size();
        difficulte.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDifficulteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(difficulte))
            )
            .andExpect(status().isBadRequest());

        // Validate the Difficulte in the database
        List<Difficulte> difficulteList = difficulteRepository.findAll();
        assertThat(difficulteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDifficulte() throws Exception {
        int databaseSizeBeforeUpdate = difficulteRepository.findAll().size();
        difficulte.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDifficulteMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(difficulte)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Difficulte in the database
        List<Difficulte> difficulteList = difficulteRepository.findAll();
        assertThat(difficulteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDifficulteWithPatch() throws Exception {
        // Initialize the database
        difficulteRepository.saveAndFlush(difficulte);

        int databaseSizeBeforeUpdate = difficulteRepository.findAll().size();

        // Update the difficulte using partial update
        Difficulte partialUpdatedDifficulte = new Difficulte();
        partialUpdatedDifficulte.setId(difficulte.getId());

        restDifficulteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDifficulte.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDifficulte))
            )
            .andExpect(status().isOk());

        // Validate the Difficulte in the database
        List<Difficulte> difficulteList = difficulteRepository.findAll();
        assertThat(difficulteList).hasSize(databaseSizeBeforeUpdate);
        Difficulte testDifficulte = difficulteList.get(difficulteList.size() - 1);
        assertThat(testDifficulte.getNature()).isEqualTo(DEFAULT_NATURE);
        assertThat(testDifficulte.getAutreNature()).isEqualTo(DEFAULT_AUTRE_NATURE);
        assertThat(testDifficulte.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testDifficulte.getSolution()).isEqualTo(DEFAULT_SOLUTION);
        assertThat(testDifficulte.getObservation()).isEqualTo(DEFAULT_OBSERVATION);
    }

    @Test
    @Transactional
    void fullUpdateDifficulteWithPatch() throws Exception {
        // Initialize the database
        difficulteRepository.saveAndFlush(difficulte);

        int databaseSizeBeforeUpdate = difficulteRepository.findAll().size();

        // Update the difficulte using partial update
        Difficulte partialUpdatedDifficulte = new Difficulte();
        partialUpdatedDifficulte.setId(difficulte.getId());

        partialUpdatedDifficulte
            .nature(UPDATED_NATURE)
            .autreNature(UPDATED_AUTRE_NATURE)
            .description(UPDATED_DESCRIPTION)
            .solution(UPDATED_SOLUTION)
            .observation(UPDATED_OBSERVATION);

        restDifficulteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDifficulte.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDifficulte))
            )
            .andExpect(status().isOk());

        // Validate the Difficulte in the database
        List<Difficulte> difficulteList = difficulteRepository.findAll();
        assertThat(difficulteList).hasSize(databaseSizeBeforeUpdate);
        Difficulte testDifficulte = difficulteList.get(difficulteList.size() - 1);
        assertThat(testDifficulte.getNature()).isEqualTo(UPDATED_NATURE);
        assertThat(testDifficulte.getAutreNature()).isEqualTo(UPDATED_AUTRE_NATURE);
        assertThat(testDifficulte.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testDifficulte.getSolution()).isEqualTo(UPDATED_SOLUTION);
        assertThat(testDifficulte.getObservation()).isEqualTo(UPDATED_OBSERVATION);
    }

    @Test
    @Transactional
    void patchNonExistingDifficulte() throws Exception {
        int databaseSizeBeforeUpdate = difficulteRepository.findAll().size();
        difficulte.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDifficulteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, difficulte.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(difficulte))
            )
            .andExpect(status().isBadRequest());

        // Validate the Difficulte in the database
        List<Difficulte> difficulteList = difficulteRepository.findAll();
        assertThat(difficulteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDifficulte() throws Exception {
        int databaseSizeBeforeUpdate = difficulteRepository.findAll().size();
        difficulte.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDifficulteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(difficulte))
            )
            .andExpect(status().isBadRequest());

        // Validate the Difficulte in the database
        List<Difficulte> difficulteList = difficulteRepository.findAll();
        assertThat(difficulteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDifficulte() throws Exception {
        int databaseSizeBeforeUpdate = difficulteRepository.findAll().size();
        difficulte.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDifficulteMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(difficulte))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Difficulte in the database
        List<Difficulte> difficulteList = difficulteRepository.findAll();
        assertThat(difficulteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDifficulte() throws Exception {
        // Initialize the database
        difficulteRepository.saveAndFlush(difficulte);

        int databaseSizeBeforeDelete = difficulteRepository.findAll().size();

        // Delete the difficulte
        restDifficulteMockMvc
            .perform(delete(ENTITY_API_URL_ID, difficulte.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Difficulte> difficulteList = difficulteRepository.findAll();
        assertThat(difficulteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
