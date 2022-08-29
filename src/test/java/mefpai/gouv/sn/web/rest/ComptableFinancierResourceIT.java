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
import mefpai.gouv.sn.domain.ComptableFinancier;
import mefpai.gouv.sn.repository.ComptableFinancierRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ComptableFinancierResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ComptableFinancierResourceIT {

    private static final String DEFAULT_NOM_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM_PRENOM = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/comptable-financiers";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ComptableFinancierRepository comptableFinancierRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restComptableFinancierMockMvc;

    private ComptableFinancier comptableFinancier;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ComptableFinancier createEntity(EntityManager em) {
        ComptableFinancier comptableFinancier = new ComptableFinancier().nomPrenom(DEFAULT_NOM_PRENOM);
        return comptableFinancier;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ComptableFinancier createUpdatedEntity(EntityManager em) {
        ComptableFinancier comptableFinancier = new ComptableFinancier().nomPrenom(UPDATED_NOM_PRENOM);
        return comptableFinancier;
    }

    @BeforeEach
    public void initTest() {
        comptableFinancier = createEntity(em);
    }

    @Test
    @Transactional
    void createComptableFinancier() throws Exception {
        int databaseSizeBeforeCreate = comptableFinancierRepository.findAll().size();
        // Create the ComptableFinancier
        restComptableFinancierMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(comptableFinancier))
            )
            .andExpect(status().isCreated());

        // Validate the ComptableFinancier in the database
        List<ComptableFinancier> comptableFinancierList = comptableFinancierRepository.findAll();
        assertThat(comptableFinancierList).hasSize(databaseSizeBeforeCreate + 1);
        ComptableFinancier testComptableFinancier = comptableFinancierList.get(comptableFinancierList.size() - 1);
        assertThat(testComptableFinancier.getNomPrenom()).isEqualTo(DEFAULT_NOM_PRENOM);
    }

    @Test
    @Transactional
    void createComptableFinancierWithExistingId() throws Exception {
        // Create the ComptableFinancier with an existing ID
        comptableFinancier.setId(1L);

        int databaseSizeBeforeCreate = comptableFinancierRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restComptableFinancierMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(comptableFinancier))
            )
            .andExpect(status().isBadRequest());

        // Validate the ComptableFinancier in the database
        List<ComptableFinancier> comptableFinancierList = comptableFinancierRepository.findAll();
        assertThat(comptableFinancierList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = comptableFinancierRepository.findAll().size();
        // set the field null
        comptableFinancier.setNomPrenom(null);

        // Create the ComptableFinancier, which fails.

        restComptableFinancierMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(comptableFinancier))
            )
            .andExpect(status().isBadRequest());

        List<ComptableFinancier> comptableFinancierList = comptableFinancierRepository.findAll();
        assertThat(comptableFinancierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllComptableFinanciers() throws Exception {
        // Initialize the database
        comptableFinancierRepository.saveAndFlush(comptableFinancier);

        // Get all the comptableFinancierList
        restComptableFinancierMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(comptableFinancier.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomPrenom").value(hasItem(DEFAULT_NOM_PRENOM)));
    }

    @Test
    @Transactional
    void getComptableFinancier() throws Exception {
        // Initialize the database
        comptableFinancierRepository.saveAndFlush(comptableFinancier);

        // Get the comptableFinancier
        restComptableFinancierMockMvc
            .perform(get(ENTITY_API_URL_ID, comptableFinancier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(comptableFinancier.getId().intValue()))
            .andExpect(jsonPath("$.nomPrenom").value(DEFAULT_NOM_PRENOM));
    }

    @Test
    @Transactional
    void getNonExistingComptableFinancier() throws Exception {
        // Get the comptableFinancier
        restComptableFinancierMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewComptableFinancier() throws Exception {
        // Initialize the database
        comptableFinancierRepository.saveAndFlush(comptableFinancier);

        int databaseSizeBeforeUpdate = comptableFinancierRepository.findAll().size();

        // Update the comptableFinancier
        ComptableFinancier updatedComptableFinancier = comptableFinancierRepository.findById(comptableFinancier.getId()).get();
        // Disconnect from session so that the updates on updatedComptableFinancier are not directly saved in db
        em.detach(updatedComptableFinancier);
        updatedComptableFinancier.nomPrenom(UPDATED_NOM_PRENOM);

        restComptableFinancierMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedComptableFinancier.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedComptableFinancier))
            )
            .andExpect(status().isOk());

        // Validate the ComptableFinancier in the database
        List<ComptableFinancier> comptableFinancierList = comptableFinancierRepository.findAll();
        assertThat(comptableFinancierList).hasSize(databaseSizeBeforeUpdate);
        ComptableFinancier testComptableFinancier = comptableFinancierList.get(comptableFinancierList.size() - 1);
        assertThat(testComptableFinancier.getNomPrenom()).isEqualTo(UPDATED_NOM_PRENOM);
    }

    @Test
    @Transactional
    void putNonExistingComptableFinancier() throws Exception {
        int databaseSizeBeforeUpdate = comptableFinancierRepository.findAll().size();
        comptableFinancier.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restComptableFinancierMockMvc
            .perform(
                put(ENTITY_API_URL_ID, comptableFinancier.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(comptableFinancier))
            )
            .andExpect(status().isBadRequest());

        // Validate the ComptableFinancier in the database
        List<ComptableFinancier> comptableFinancierList = comptableFinancierRepository.findAll();
        assertThat(comptableFinancierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchComptableFinancier() throws Exception {
        int databaseSizeBeforeUpdate = comptableFinancierRepository.findAll().size();
        comptableFinancier.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restComptableFinancierMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(comptableFinancier))
            )
            .andExpect(status().isBadRequest());

        // Validate the ComptableFinancier in the database
        List<ComptableFinancier> comptableFinancierList = comptableFinancierRepository.findAll();
        assertThat(comptableFinancierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamComptableFinancier() throws Exception {
        int databaseSizeBeforeUpdate = comptableFinancierRepository.findAll().size();
        comptableFinancier.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restComptableFinancierMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(comptableFinancier))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ComptableFinancier in the database
        List<ComptableFinancier> comptableFinancierList = comptableFinancierRepository.findAll();
        assertThat(comptableFinancierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateComptableFinancierWithPatch() throws Exception {
        // Initialize the database
        comptableFinancierRepository.saveAndFlush(comptableFinancier);

        int databaseSizeBeforeUpdate = comptableFinancierRepository.findAll().size();

        // Update the comptableFinancier using partial update
        ComptableFinancier partialUpdatedComptableFinancier = new ComptableFinancier();
        partialUpdatedComptableFinancier.setId(comptableFinancier.getId());

        restComptableFinancierMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedComptableFinancier.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedComptableFinancier))
            )
            .andExpect(status().isOk());

        // Validate the ComptableFinancier in the database
        List<ComptableFinancier> comptableFinancierList = comptableFinancierRepository.findAll();
        assertThat(comptableFinancierList).hasSize(databaseSizeBeforeUpdate);
        ComptableFinancier testComptableFinancier = comptableFinancierList.get(comptableFinancierList.size() - 1);
        assertThat(testComptableFinancier.getNomPrenom()).isEqualTo(DEFAULT_NOM_PRENOM);
    }

    @Test
    @Transactional
    void fullUpdateComptableFinancierWithPatch() throws Exception {
        // Initialize the database
        comptableFinancierRepository.saveAndFlush(comptableFinancier);

        int databaseSizeBeforeUpdate = comptableFinancierRepository.findAll().size();

        // Update the comptableFinancier using partial update
        ComptableFinancier partialUpdatedComptableFinancier = new ComptableFinancier();
        partialUpdatedComptableFinancier.setId(comptableFinancier.getId());

        partialUpdatedComptableFinancier.nomPrenom(UPDATED_NOM_PRENOM);

        restComptableFinancierMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedComptableFinancier.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedComptableFinancier))
            )
            .andExpect(status().isOk());

        // Validate the ComptableFinancier in the database
        List<ComptableFinancier> comptableFinancierList = comptableFinancierRepository.findAll();
        assertThat(comptableFinancierList).hasSize(databaseSizeBeforeUpdate);
        ComptableFinancier testComptableFinancier = comptableFinancierList.get(comptableFinancierList.size() - 1);
        assertThat(testComptableFinancier.getNomPrenom()).isEqualTo(UPDATED_NOM_PRENOM);
    }

    @Test
    @Transactional
    void patchNonExistingComptableFinancier() throws Exception {
        int databaseSizeBeforeUpdate = comptableFinancierRepository.findAll().size();
        comptableFinancier.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restComptableFinancierMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, comptableFinancier.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(comptableFinancier))
            )
            .andExpect(status().isBadRequest());

        // Validate the ComptableFinancier in the database
        List<ComptableFinancier> comptableFinancierList = comptableFinancierRepository.findAll();
        assertThat(comptableFinancierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchComptableFinancier() throws Exception {
        int databaseSizeBeforeUpdate = comptableFinancierRepository.findAll().size();
        comptableFinancier.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restComptableFinancierMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(comptableFinancier))
            )
            .andExpect(status().isBadRequest());

        // Validate the ComptableFinancier in the database
        List<ComptableFinancier> comptableFinancierList = comptableFinancierRepository.findAll();
        assertThat(comptableFinancierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamComptableFinancier() throws Exception {
        int databaseSizeBeforeUpdate = comptableFinancierRepository.findAll().size();
        comptableFinancier.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restComptableFinancierMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(comptableFinancier))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ComptableFinancier in the database
        List<ComptableFinancier> comptableFinancierList = comptableFinancierRepository.findAll();
        assertThat(comptableFinancierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteComptableFinancier() throws Exception {
        // Initialize the database
        comptableFinancierRepository.saveAndFlush(comptableFinancier);

        int databaseSizeBeforeDelete = comptableFinancierRepository.findAll().size();

        // Delete the comptableFinancier
        restComptableFinancierMockMvc
            .perform(delete(ENTITY_API_URL_ID, comptableFinancier.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ComptableFinancier> comptableFinancierList = comptableFinancierRepository.findAll();
        assertThat(comptableFinancierList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
