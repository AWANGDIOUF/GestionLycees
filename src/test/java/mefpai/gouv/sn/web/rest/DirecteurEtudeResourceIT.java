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
import mefpai.gouv.sn.domain.DirecteurEtude;
import mefpai.gouv.sn.repository.DirecteurEtudeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link DirecteurEtudeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DirecteurEtudeResourceIT {

    private static final String DEFAULT_NOM_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM_PRENOM = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/directeur-etudes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DirecteurEtudeRepository directeurEtudeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDirecteurEtudeMockMvc;

    private DirecteurEtude directeurEtude;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DirecteurEtude createEntity(EntityManager em) {
        DirecteurEtude directeurEtude = new DirecteurEtude().nomPrenom(DEFAULT_NOM_PRENOM);
        return directeurEtude;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DirecteurEtude createUpdatedEntity(EntityManager em) {
        DirecteurEtude directeurEtude = new DirecteurEtude().nomPrenom(UPDATED_NOM_PRENOM);
        return directeurEtude;
    }

    @BeforeEach
    public void initTest() {
        directeurEtude = createEntity(em);
    }

    @Test
    @Transactional
    void createDirecteurEtude() throws Exception {
        int databaseSizeBeforeCreate = directeurEtudeRepository.findAll().size();
        // Create the DirecteurEtude
        restDirecteurEtudeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(directeurEtude))
            )
            .andExpect(status().isCreated());

        // Validate the DirecteurEtude in the database
        List<DirecteurEtude> directeurEtudeList = directeurEtudeRepository.findAll();
        assertThat(directeurEtudeList).hasSize(databaseSizeBeforeCreate + 1);
        DirecteurEtude testDirecteurEtude = directeurEtudeList.get(directeurEtudeList.size() - 1);
        assertThat(testDirecteurEtude.getNomPrenom()).isEqualTo(DEFAULT_NOM_PRENOM);
    }

    @Test
    @Transactional
    void createDirecteurEtudeWithExistingId() throws Exception {
        // Create the DirecteurEtude with an existing ID
        directeurEtude.setId(1L);

        int databaseSizeBeforeCreate = directeurEtudeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDirecteurEtudeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(directeurEtude))
            )
            .andExpect(status().isBadRequest());

        // Validate the DirecteurEtude in the database
        List<DirecteurEtude> directeurEtudeList = directeurEtudeRepository.findAll();
        assertThat(directeurEtudeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = directeurEtudeRepository.findAll().size();
        // set the field null
        directeurEtude.setNomPrenom(null);

        // Create the DirecteurEtude, which fails.

        restDirecteurEtudeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(directeurEtude))
            )
            .andExpect(status().isBadRequest());

        List<DirecteurEtude> directeurEtudeList = directeurEtudeRepository.findAll();
        assertThat(directeurEtudeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllDirecteurEtudes() throws Exception {
        // Initialize the database
        directeurEtudeRepository.saveAndFlush(directeurEtude);

        // Get all the directeurEtudeList
        restDirecteurEtudeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(directeurEtude.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomPrenom").value(hasItem(DEFAULT_NOM_PRENOM)));
    }

    @Test
    @Transactional
    void getDirecteurEtude() throws Exception {
        // Initialize the database
        directeurEtudeRepository.saveAndFlush(directeurEtude);

        // Get the directeurEtude
        restDirecteurEtudeMockMvc
            .perform(get(ENTITY_API_URL_ID, directeurEtude.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(directeurEtude.getId().intValue()))
            .andExpect(jsonPath("$.nomPrenom").value(DEFAULT_NOM_PRENOM));
    }

    @Test
    @Transactional
    void getNonExistingDirecteurEtude() throws Exception {
        // Get the directeurEtude
        restDirecteurEtudeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDirecteurEtude() throws Exception {
        // Initialize the database
        directeurEtudeRepository.saveAndFlush(directeurEtude);

        int databaseSizeBeforeUpdate = directeurEtudeRepository.findAll().size();

        // Update the directeurEtude
        DirecteurEtude updatedDirecteurEtude = directeurEtudeRepository.findById(directeurEtude.getId()).get();
        // Disconnect from session so that the updates on updatedDirecteurEtude are not directly saved in db
        em.detach(updatedDirecteurEtude);
        updatedDirecteurEtude.nomPrenom(UPDATED_NOM_PRENOM);

        restDirecteurEtudeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDirecteurEtude.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDirecteurEtude))
            )
            .andExpect(status().isOk());

        // Validate the DirecteurEtude in the database
        List<DirecteurEtude> directeurEtudeList = directeurEtudeRepository.findAll();
        assertThat(directeurEtudeList).hasSize(databaseSizeBeforeUpdate);
        DirecteurEtude testDirecteurEtude = directeurEtudeList.get(directeurEtudeList.size() - 1);
        assertThat(testDirecteurEtude.getNomPrenom()).isEqualTo(UPDATED_NOM_PRENOM);
    }

    @Test
    @Transactional
    void putNonExistingDirecteurEtude() throws Exception {
        int databaseSizeBeforeUpdate = directeurEtudeRepository.findAll().size();
        directeurEtude.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDirecteurEtudeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, directeurEtude.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(directeurEtude))
            )
            .andExpect(status().isBadRequest());

        // Validate the DirecteurEtude in the database
        List<DirecteurEtude> directeurEtudeList = directeurEtudeRepository.findAll();
        assertThat(directeurEtudeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDirecteurEtude() throws Exception {
        int databaseSizeBeforeUpdate = directeurEtudeRepository.findAll().size();
        directeurEtude.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDirecteurEtudeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(directeurEtude))
            )
            .andExpect(status().isBadRequest());

        // Validate the DirecteurEtude in the database
        List<DirecteurEtude> directeurEtudeList = directeurEtudeRepository.findAll();
        assertThat(directeurEtudeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDirecteurEtude() throws Exception {
        int databaseSizeBeforeUpdate = directeurEtudeRepository.findAll().size();
        directeurEtude.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDirecteurEtudeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(directeurEtude)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DirecteurEtude in the database
        List<DirecteurEtude> directeurEtudeList = directeurEtudeRepository.findAll();
        assertThat(directeurEtudeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDirecteurEtudeWithPatch() throws Exception {
        // Initialize the database
        directeurEtudeRepository.saveAndFlush(directeurEtude);

        int databaseSizeBeforeUpdate = directeurEtudeRepository.findAll().size();

        // Update the directeurEtude using partial update
        DirecteurEtude partialUpdatedDirecteurEtude = new DirecteurEtude();
        partialUpdatedDirecteurEtude.setId(directeurEtude.getId());

        restDirecteurEtudeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDirecteurEtude.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDirecteurEtude))
            )
            .andExpect(status().isOk());

        // Validate the DirecteurEtude in the database
        List<DirecteurEtude> directeurEtudeList = directeurEtudeRepository.findAll();
        assertThat(directeurEtudeList).hasSize(databaseSizeBeforeUpdate);
        DirecteurEtude testDirecteurEtude = directeurEtudeList.get(directeurEtudeList.size() - 1);
        assertThat(testDirecteurEtude.getNomPrenom()).isEqualTo(DEFAULT_NOM_PRENOM);
    }

    @Test
    @Transactional
    void fullUpdateDirecteurEtudeWithPatch() throws Exception {
        // Initialize the database
        directeurEtudeRepository.saveAndFlush(directeurEtude);

        int databaseSizeBeforeUpdate = directeurEtudeRepository.findAll().size();

        // Update the directeurEtude using partial update
        DirecteurEtude partialUpdatedDirecteurEtude = new DirecteurEtude();
        partialUpdatedDirecteurEtude.setId(directeurEtude.getId());

        partialUpdatedDirecteurEtude.nomPrenom(UPDATED_NOM_PRENOM);

        restDirecteurEtudeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDirecteurEtude.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDirecteurEtude))
            )
            .andExpect(status().isOk());

        // Validate the DirecteurEtude in the database
        List<DirecteurEtude> directeurEtudeList = directeurEtudeRepository.findAll();
        assertThat(directeurEtudeList).hasSize(databaseSizeBeforeUpdate);
        DirecteurEtude testDirecteurEtude = directeurEtudeList.get(directeurEtudeList.size() - 1);
        assertThat(testDirecteurEtude.getNomPrenom()).isEqualTo(UPDATED_NOM_PRENOM);
    }

    @Test
    @Transactional
    void patchNonExistingDirecteurEtude() throws Exception {
        int databaseSizeBeforeUpdate = directeurEtudeRepository.findAll().size();
        directeurEtude.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDirecteurEtudeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, directeurEtude.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(directeurEtude))
            )
            .andExpect(status().isBadRequest());

        // Validate the DirecteurEtude in the database
        List<DirecteurEtude> directeurEtudeList = directeurEtudeRepository.findAll();
        assertThat(directeurEtudeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDirecteurEtude() throws Exception {
        int databaseSizeBeforeUpdate = directeurEtudeRepository.findAll().size();
        directeurEtude.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDirecteurEtudeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(directeurEtude))
            )
            .andExpect(status().isBadRequest());

        // Validate the DirecteurEtude in the database
        List<DirecteurEtude> directeurEtudeList = directeurEtudeRepository.findAll();
        assertThat(directeurEtudeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDirecteurEtude() throws Exception {
        int databaseSizeBeforeUpdate = directeurEtudeRepository.findAll().size();
        directeurEtude.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDirecteurEtudeMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(directeurEtude))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DirecteurEtude in the database
        List<DirecteurEtude> directeurEtudeList = directeurEtudeRepository.findAll();
        assertThat(directeurEtudeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDirecteurEtude() throws Exception {
        // Initialize the database
        directeurEtudeRepository.saveAndFlush(directeurEtude);

        int databaseSizeBeforeDelete = directeurEtudeRepository.findAll().size();

        // Delete the directeurEtude
        restDirecteurEtudeMockMvc
            .perform(delete(ENTITY_API_URL_ID, directeurEtude.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DirecteurEtude> directeurEtudeList = directeurEtudeRepository.findAll();
        assertThat(directeurEtudeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
