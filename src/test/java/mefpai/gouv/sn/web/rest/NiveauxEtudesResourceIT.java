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
import mefpai.gouv.sn.domain.NiveauxEtudes;
import mefpai.gouv.sn.repository.NiveauxEtudesRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link NiveauxEtudesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class NiveauxEtudesResourceIT {

    private static final String DEFAULT_NOM_NIVEAU = "AAAAAAAAAA";
    private static final String UPDATED_NOM_NIVEAU = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/niveaux-etudes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private NiveauxEtudesRepository niveauxEtudesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNiveauxEtudesMockMvc;

    private NiveauxEtudes niveauxEtudes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NiveauxEtudes createEntity(EntityManager em) {
        NiveauxEtudes niveauxEtudes = new NiveauxEtudes().nomNiveau(DEFAULT_NOM_NIVEAU);
        return niveauxEtudes;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NiveauxEtudes createUpdatedEntity(EntityManager em) {
        NiveauxEtudes niveauxEtudes = new NiveauxEtudes().nomNiveau(UPDATED_NOM_NIVEAU);
        return niveauxEtudes;
    }

    @BeforeEach
    public void initTest() {
        niveauxEtudes = createEntity(em);
    }

    @Test
    @Transactional
    void createNiveauxEtudes() throws Exception {
        int databaseSizeBeforeCreate = niveauxEtudesRepository.findAll().size();
        // Create the NiveauxEtudes
        restNiveauxEtudesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(niveauxEtudes)))
            .andExpect(status().isCreated());

        // Validate the NiveauxEtudes in the database
        List<NiveauxEtudes> niveauxEtudesList = niveauxEtudesRepository.findAll();
        assertThat(niveauxEtudesList).hasSize(databaseSizeBeforeCreate + 1);
        NiveauxEtudes testNiveauxEtudes = niveauxEtudesList.get(niveauxEtudesList.size() - 1);
        assertThat(testNiveauxEtudes.getNomNiveau()).isEqualTo(DEFAULT_NOM_NIVEAU);
    }

    @Test
    @Transactional
    void createNiveauxEtudesWithExistingId() throws Exception {
        // Create the NiveauxEtudes with an existing ID
        niveauxEtudes.setId(1L);

        int databaseSizeBeforeCreate = niveauxEtudesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restNiveauxEtudesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(niveauxEtudes)))
            .andExpect(status().isBadRequest());

        // Validate the NiveauxEtudes in the database
        List<NiveauxEtudes> niveauxEtudesList = niveauxEtudesRepository.findAll();
        assertThat(niveauxEtudesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomNiveauIsRequired() throws Exception {
        int databaseSizeBeforeTest = niveauxEtudesRepository.findAll().size();
        // set the field null
        niveauxEtudes.setNomNiveau(null);

        // Create the NiveauxEtudes, which fails.

        restNiveauxEtudesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(niveauxEtudes)))
            .andExpect(status().isBadRequest());

        List<NiveauxEtudes> niveauxEtudesList = niveauxEtudesRepository.findAll();
        assertThat(niveauxEtudesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllNiveauxEtudes() throws Exception {
        // Initialize the database
        niveauxEtudesRepository.saveAndFlush(niveauxEtudes);

        // Get all the niveauxEtudesList
        restNiveauxEtudesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(niveauxEtudes.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomNiveau").value(hasItem(DEFAULT_NOM_NIVEAU)));
    }

    @Test
    @Transactional
    void getNiveauxEtudes() throws Exception {
        // Initialize the database
        niveauxEtudesRepository.saveAndFlush(niveauxEtudes);

        // Get the niveauxEtudes
        restNiveauxEtudesMockMvc
            .perform(get(ENTITY_API_URL_ID, niveauxEtudes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(niveauxEtudes.getId().intValue()))
            .andExpect(jsonPath("$.nomNiveau").value(DEFAULT_NOM_NIVEAU));
    }

    @Test
    @Transactional
    void getNonExistingNiveauxEtudes() throws Exception {
        // Get the niveauxEtudes
        restNiveauxEtudesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewNiveauxEtudes() throws Exception {
        // Initialize the database
        niveauxEtudesRepository.saveAndFlush(niveauxEtudes);

        int databaseSizeBeforeUpdate = niveauxEtudesRepository.findAll().size();

        // Update the niveauxEtudes
        NiveauxEtudes updatedNiveauxEtudes = niveauxEtudesRepository.findById(niveauxEtudes.getId()).get();
        // Disconnect from session so that the updates on updatedNiveauxEtudes are not directly saved in db
        em.detach(updatedNiveauxEtudes);
        updatedNiveauxEtudes.nomNiveau(UPDATED_NOM_NIVEAU);

        restNiveauxEtudesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedNiveauxEtudes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedNiveauxEtudes))
            )
            .andExpect(status().isOk());

        // Validate the NiveauxEtudes in the database
        List<NiveauxEtudes> niveauxEtudesList = niveauxEtudesRepository.findAll();
        assertThat(niveauxEtudesList).hasSize(databaseSizeBeforeUpdate);
        NiveauxEtudes testNiveauxEtudes = niveauxEtudesList.get(niveauxEtudesList.size() - 1);
        assertThat(testNiveauxEtudes.getNomNiveau()).isEqualTo(UPDATED_NOM_NIVEAU);
    }

    @Test
    @Transactional
    void putNonExistingNiveauxEtudes() throws Exception {
        int databaseSizeBeforeUpdate = niveauxEtudesRepository.findAll().size();
        niveauxEtudes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNiveauxEtudesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, niveauxEtudes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(niveauxEtudes))
            )
            .andExpect(status().isBadRequest());

        // Validate the NiveauxEtudes in the database
        List<NiveauxEtudes> niveauxEtudesList = niveauxEtudesRepository.findAll();
        assertThat(niveauxEtudesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchNiveauxEtudes() throws Exception {
        int databaseSizeBeforeUpdate = niveauxEtudesRepository.findAll().size();
        niveauxEtudes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNiveauxEtudesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(niveauxEtudes))
            )
            .andExpect(status().isBadRequest());

        // Validate the NiveauxEtudes in the database
        List<NiveauxEtudes> niveauxEtudesList = niveauxEtudesRepository.findAll();
        assertThat(niveauxEtudesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamNiveauxEtudes() throws Exception {
        int databaseSizeBeforeUpdate = niveauxEtudesRepository.findAll().size();
        niveauxEtudes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNiveauxEtudesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(niveauxEtudes)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the NiveauxEtudes in the database
        List<NiveauxEtudes> niveauxEtudesList = niveauxEtudesRepository.findAll();
        assertThat(niveauxEtudesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateNiveauxEtudesWithPatch() throws Exception {
        // Initialize the database
        niveauxEtudesRepository.saveAndFlush(niveauxEtudes);

        int databaseSizeBeforeUpdate = niveauxEtudesRepository.findAll().size();

        // Update the niveauxEtudes using partial update
        NiveauxEtudes partialUpdatedNiveauxEtudes = new NiveauxEtudes();
        partialUpdatedNiveauxEtudes.setId(niveauxEtudes.getId());

        partialUpdatedNiveauxEtudes.nomNiveau(UPDATED_NOM_NIVEAU);

        restNiveauxEtudesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNiveauxEtudes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNiveauxEtudes))
            )
            .andExpect(status().isOk());

        // Validate the NiveauxEtudes in the database
        List<NiveauxEtudes> niveauxEtudesList = niveauxEtudesRepository.findAll();
        assertThat(niveauxEtudesList).hasSize(databaseSizeBeforeUpdate);
        NiveauxEtudes testNiveauxEtudes = niveauxEtudesList.get(niveauxEtudesList.size() - 1);
        assertThat(testNiveauxEtudes.getNomNiveau()).isEqualTo(UPDATED_NOM_NIVEAU);
    }

    @Test
    @Transactional
    void fullUpdateNiveauxEtudesWithPatch() throws Exception {
        // Initialize the database
        niveauxEtudesRepository.saveAndFlush(niveauxEtudes);

        int databaseSizeBeforeUpdate = niveauxEtudesRepository.findAll().size();

        // Update the niveauxEtudes using partial update
        NiveauxEtudes partialUpdatedNiveauxEtudes = new NiveauxEtudes();
        partialUpdatedNiveauxEtudes.setId(niveauxEtudes.getId());

        partialUpdatedNiveauxEtudes.nomNiveau(UPDATED_NOM_NIVEAU);

        restNiveauxEtudesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNiveauxEtudes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNiveauxEtudes))
            )
            .andExpect(status().isOk());

        // Validate the NiveauxEtudes in the database
        List<NiveauxEtudes> niveauxEtudesList = niveauxEtudesRepository.findAll();
        assertThat(niveauxEtudesList).hasSize(databaseSizeBeforeUpdate);
        NiveauxEtudes testNiveauxEtudes = niveauxEtudesList.get(niveauxEtudesList.size() - 1);
        assertThat(testNiveauxEtudes.getNomNiveau()).isEqualTo(UPDATED_NOM_NIVEAU);
    }

    @Test
    @Transactional
    void patchNonExistingNiveauxEtudes() throws Exception {
        int databaseSizeBeforeUpdate = niveauxEtudesRepository.findAll().size();
        niveauxEtudes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNiveauxEtudesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, niveauxEtudes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(niveauxEtudes))
            )
            .andExpect(status().isBadRequest());

        // Validate the NiveauxEtudes in the database
        List<NiveauxEtudes> niveauxEtudesList = niveauxEtudesRepository.findAll();
        assertThat(niveauxEtudesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchNiveauxEtudes() throws Exception {
        int databaseSizeBeforeUpdate = niveauxEtudesRepository.findAll().size();
        niveauxEtudes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNiveauxEtudesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(niveauxEtudes))
            )
            .andExpect(status().isBadRequest());

        // Validate the NiveauxEtudes in the database
        List<NiveauxEtudes> niveauxEtudesList = niveauxEtudesRepository.findAll();
        assertThat(niveauxEtudesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamNiveauxEtudes() throws Exception {
        int databaseSizeBeforeUpdate = niveauxEtudesRepository.findAll().size();
        niveauxEtudes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNiveauxEtudesMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(niveauxEtudes))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the NiveauxEtudes in the database
        List<NiveauxEtudes> niveauxEtudesList = niveauxEtudesRepository.findAll();
        assertThat(niveauxEtudesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteNiveauxEtudes() throws Exception {
        // Initialize the database
        niveauxEtudesRepository.saveAndFlush(niveauxEtudes);

        int databaseSizeBeforeDelete = niveauxEtudesRepository.findAll().size();

        // Delete the niveauxEtudes
        restNiveauxEtudesMockMvc
            .perform(delete(ENTITY_API_URL_ID, niveauxEtudes.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NiveauxEtudes> niveauxEtudesList = niveauxEtudesRepository.findAll();
        assertThat(niveauxEtudesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
