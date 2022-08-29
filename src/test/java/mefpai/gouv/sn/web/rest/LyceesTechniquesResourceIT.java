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
import mefpai.gouv.sn.domain.LyceesTechniques;
import mefpai.gouv.sn.repository.LyceesTechniquesRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link LyceesTechniquesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LyceesTechniquesResourceIT {

    private static final String DEFAULT_NOM_LYCEE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_LYCEE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/lycees-techniques";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LyceesTechniquesRepository lyceesTechniquesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLyceesTechniquesMockMvc;

    private LyceesTechniques lyceesTechniques;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LyceesTechniques createEntity(EntityManager em) {
        LyceesTechniques lyceesTechniques = new LyceesTechniques().nomLycee(DEFAULT_NOM_LYCEE);
        return lyceesTechniques;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LyceesTechniques createUpdatedEntity(EntityManager em) {
        LyceesTechniques lyceesTechniques = new LyceesTechniques().nomLycee(UPDATED_NOM_LYCEE);
        return lyceesTechniques;
    }

    @BeforeEach
    public void initTest() {
        lyceesTechniques = createEntity(em);
    }

    @Test
    @Transactional
    void createLyceesTechniques() throws Exception {
        int databaseSizeBeforeCreate = lyceesTechniquesRepository.findAll().size();
        // Create the LyceesTechniques
        restLyceesTechniquesMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceesTechniques))
            )
            .andExpect(status().isCreated());

        // Validate the LyceesTechniques in the database
        List<LyceesTechniques> lyceesTechniquesList = lyceesTechniquesRepository.findAll();
        assertThat(lyceesTechniquesList).hasSize(databaseSizeBeforeCreate + 1);
        LyceesTechniques testLyceesTechniques = lyceesTechniquesList.get(lyceesTechniquesList.size() - 1);
        assertThat(testLyceesTechniques.getNomLycee()).isEqualTo(DEFAULT_NOM_LYCEE);
    }

    @Test
    @Transactional
    void createLyceesTechniquesWithExistingId() throws Exception {
        // Create the LyceesTechniques with an existing ID
        lyceesTechniques.setId(1L);

        int databaseSizeBeforeCreate = lyceesTechniquesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLyceesTechniquesMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceesTechniques))
            )
            .andExpect(status().isBadRequest());

        // Validate the LyceesTechniques in the database
        List<LyceesTechniques> lyceesTechniquesList = lyceesTechniquesRepository.findAll();
        assertThat(lyceesTechniquesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomLyceeIsRequired() throws Exception {
        int databaseSizeBeforeTest = lyceesTechniquesRepository.findAll().size();
        // set the field null
        lyceesTechniques.setNomLycee(null);

        // Create the LyceesTechniques, which fails.

        restLyceesTechniquesMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceesTechniques))
            )
            .andExpect(status().isBadRequest());

        List<LyceesTechniques> lyceesTechniquesList = lyceesTechniquesRepository.findAll();
        assertThat(lyceesTechniquesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllLyceesTechniques() throws Exception {
        // Initialize the database
        lyceesTechniquesRepository.saveAndFlush(lyceesTechniques);

        // Get all the lyceesTechniquesList
        restLyceesTechniquesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lyceesTechniques.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomLycee").value(hasItem(DEFAULT_NOM_LYCEE)));
    }

    @Test
    @Transactional
    void getLyceesTechniques() throws Exception {
        // Initialize the database
        lyceesTechniquesRepository.saveAndFlush(lyceesTechniques);

        // Get the lyceesTechniques
        restLyceesTechniquesMockMvc
            .perform(get(ENTITY_API_URL_ID, lyceesTechniques.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(lyceesTechniques.getId().intValue()))
            .andExpect(jsonPath("$.nomLycee").value(DEFAULT_NOM_LYCEE));
    }

    @Test
    @Transactional
    void getNonExistingLyceesTechniques() throws Exception {
        // Get the lyceesTechniques
        restLyceesTechniquesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewLyceesTechniques() throws Exception {
        // Initialize the database
        lyceesTechniquesRepository.saveAndFlush(lyceesTechniques);

        int databaseSizeBeforeUpdate = lyceesTechniquesRepository.findAll().size();

        // Update the lyceesTechniques
        LyceesTechniques updatedLyceesTechniques = lyceesTechniquesRepository.findById(lyceesTechniques.getId()).get();
        // Disconnect from session so that the updates on updatedLyceesTechniques are not directly saved in db
        em.detach(updatedLyceesTechniques);
        updatedLyceesTechniques.nomLycee(UPDATED_NOM_LYCEE);

        restLyceesTechniquesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedLyceesTechniques.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedLyceesTechniques))
            )
            .andExpect(status().isOk());

        // Validate the LyceesTechniques in the database
        List<LyceesTechniques> lyceesTechniquesList = lyceesTechniquesRepository.findAll();
        assertThat(lyceesTechniquesList).hasSize(databaseSizeBeforeUpdate);
        LyceesTechniques testLyceesTechniques = lyceesTechniquesList.get(lyceesTechniquesList.size() - 1);
        assertThat(testLyceesTechniques.getNomLycee()).isEqualTo(UPDATED_NOM_LYCEE);
    }

    @Test
    @Transactional
    void putNonExistingLyceesTechniques() throws Exception {
        int databaseSizeBeforeUpdate = lyceesTechniquesRepository.findAll().size();
        lyceesTechniques.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLyceesTechniquesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, lyceesTechniques.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(lyceesTechniques))
            )
            .andExpect(status().isBadRequest());

        // Validate the LyceesTechniques in the database
        List<LyceesTechniques> lyceesTechniquesList = lyceesTechniquesRepository.findAll();
        assertThat(lyceesTechniquesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLyceesTechniques() throws Exception {
        int databaseSizeBeforeUpdate = lyceesTechniquesRepository.findAll().size();
        lyceesTechniques.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLyceesTechniquesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(lyceesTechniques))
            )
            .andExpect(status().isBadRequest());

        // Validate the LyceesTechniques in the database
        List<LyceesTechniques> lyceesTechniquesList = lyceesTechniquesRepository.findAll();
        assertThat(lyceesTechniquesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLyceesTechniques() throws Exception {
        int databaseSizeBeforeUpdate = lyceesTechniquesRepository.findAll().size();
        lyceesTechniques.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLyceesTechniquesMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceesTechniques))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LyceesTechniques in the database
        List<LyceesTechniques> lyceesTechniquesList = lyceesTechniquesRepository.findAll();
        assertThat(lyceesTechniquesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLyceesTechniquesWithPatch() throws Exception {
        // Initialize the database
        lyceesTechniquesRepository.saveAndFlush(lyceesTechniques);

        int databaseSizeBeforeUpdate = lyceesTechniquesRepository.findAll().size();

        // Update the lyceesTechniques using partial update
        LyceesTechniques partialUpdatedLyceesTechniques = new LyceesTechniques();
        partialUpdatedLyceesTechniques.setId(lyceesTechniques.getId());

        restLyceesTechniquesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLyceesTechniques.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLyceesTechniques))
            )
            .andExpect(status().isOk());

        // Validate the LyceesTechniques in the database
        List<LyceesTechniques> lyceesTechniquesList = lyceesTechniquesRepository.findAll();
        assertThat(lyceesTechniquesList).hasSize(databaseSizeBeforeUpdate);
        LyceesTechniques testLyceesTechniques = lyceesTechniquesList.get(lyceesTechniquesList.size() - 1);
        assertThat(testLyceesTechniques.getNomLycee()).isEqualTo(DEFAULT_NOM_LYCEE);
    }

    @Test
    @Transactional
    void fullUpdateLyceesTechniquesWithPatch() throws Exception {
        // Initialize the database
        lyceesTechniquesRepository.saveAndFlush(lyceesTechniques);

        int databaseSizeBeforeUpdate = lyceesTechniquesRepository.findAll().size();

        // Update the lyceesTechniques using partial update
        LyceesTechniques partialUpdatedLyceesTechniques = new LyceesTechniques();
        partialUpdatedLyceesTechniques.setId(lyceesTechniques.getId());

        partialUpdatedLyceesTechniques.nomLycee(UPDATED_NOM_LYCEE);

        restLyceesTechniquesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLyceesTechniques.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLyceesTechniques))
            )
            .andExpect(status().isOk());

        // Validate the LyceesTechniques in the database
        List<LyceesTechniques> lyceesTechniquesList = lyceesTechniquesRepository.findAll();
        assertThat(lyceesTechniquesList).hasSize(databaseSizeBeforeUpdate);
        LyceesTechniques testLyceesTechniques = lyceesTechniquesList.get(lyceesTechniquesList.size() - 1);
        assertThat(testLyceesTechniques.getNomLycee()).isEqualTo(UPDATED_NOM_LYCEE);
    }

    @Test
    @Transactional
    void patchNonExistingLyceesTechniques() throws Exception {
        int databaseSizeBeforeUpdate = lyceesTechniquesRepository.findAll().size();
        lyceesTechniques.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLyceesTechniquesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, lyceesTechniques.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lyceesTechniques))
            )
            .andExpect(status().isBadRequest());

        // Validate the LyceesTechniques in the database
        List<LyceesTechniques> lyceesTechniquesList = lyceesTechniquesRepository.findAll();
        assertThat(lyceesTechniquesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLyceesTechniques() throws Exception {
        int databaseSizeBeforeUpdate = lyceesTechniquesRepository.findAll().size();
        lyceesTechniques.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLyceesTechniquesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lyceesTechniques))
            )
            .andExpect(status().isBadRequest());

        // Validate the LyceesTechniques in the database
        List<LyceesTechniques> lyceesTechniquesList = lyceesTechniquesRepository.findAll();
        assertThat(lyceesTechniquesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLyceesTechniques() throws Exception {
        int databaseSizeBeforeUpdate = lyceesTechniquesRepository.findAll().size();
        lyceesTechniques.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLyceesTechniquesMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lyceesTechniques))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LyceesTechniques in the database
        List<LyceesTechniques> lyceesTechniquesList = lyceesTechniquesRepository.findAll();
        assertThat(lyceesTechniquesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLyceesTechniques() throws Exception {
        // Initialize the database
        lyceesTechniquesRepository.saveAndFlush(lyceesTechniques);

        int databaseSizeBeforeDelete = lyceesTechniquesRepository.findAll().size();

        // Delete the lyceesTechniques
        restLyceesTechniquesMockMvc
            .perform(delete(ENTITY_API_URL_ID, lyceesTechniques.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LyceesTechniques> lyceesTechniquesList = lyceesTechniquesRepository.findAll();
        assertThat(lyceesTechniquesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
