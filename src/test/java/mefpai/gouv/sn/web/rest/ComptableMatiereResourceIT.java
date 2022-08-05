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
import mefpai.gouv.sn.domain.ComptableMatiere;
import mefpai.gouv.sn.repository.ComptableMatiereRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ComptableMatiereResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ComptableMatiereResourceIT {

    private static final String DEFAULT_NOM_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM_PRENOM = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/comptable-matieres";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ComptableMatiereRepository comptableMatiereRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restComptableMatiereMockMvc;

    private ComptableMatiere comptableMatiere;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ComptableMatiere createEntity(EntityManager em) {
        ComptableMatiere comptableMatiere = new ComptableMatiere().nomPrenom(DEFAULT_NOM_PRENOM);
        return comptableMatiere;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ComptableMatiere createUpdatedEntity(EntityManager em) {
        ComptableMatiere comptableMatiere = new ComptableMatiere().nomPrenom(UPDATED_NOM_PRENOM);
        return comptableMatiere;
    }

    @BeforeEach
    public void initTest() {
        comptableMatiere = createEntity(em);
    }

    @Test
    @Transactional
    void createComptableMatiere() throws Exception {
        int databaseSizeBeforeCreate = comptableMatiereRepository.findAll().size();
        // Create the ComptableMatiere
        restComptableMatiereMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(comptableMatiere))
            )
            .andExpect(status().isCreated());

        // Validate the ComptableMatiere in the database
        List<ComptableMatiere> comptableMatiereList = comptableMatiereRepository.findAll();
        assertThat(comptableMatiereList).hasSize(databaseSizeBeforeCreate + 1);
        ComptableMatiere testComptableMatiere = comptableMatiereList.get(comptableMatiereList.size() - 1);
        assertThat(testComptableMatiere.getNomPrenom()).isEqualTo(DEFAULT_NOM_PRENOM);
    }

    @Test
    @Transactional
    void createComptableMatiereWithExistingId() throws Exception {
        // Create the ComptableMatiere with an existing ID
        comptableMatiere.setId(1L);

        int databaseSizeBeforeCreate = comptableMatiereRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restComptableMatiereMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(comptableMatiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the ComptableMatiere in the database
        List<ComptableMatiere> comptableMatiereList = comptableMatiereRepository.findAll();
        assertThat(comptableMatiereList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = comptableMatiereRepository.findAll().size();
        // set the field null
        comptableMatiere.setNomPrenom(null);

        // Create the ComptableMatiere, which fails.

        restComptableMatiereMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(comptableMatiere))
            )
            .andExpect(status().isBadRequest());

        List<ComptableMatiere> comptableMatiereList = comptableMatiereRepository.findAll();
        assertThat(comptableMatiereList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllComptableMatieres() throws Exception {
        // Initialize the database
        comptableMatiereRepository.saveAndFlush(comptableMatiere);

        // Get all the comptableMatiereList
        restComptableMatiereMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(comptableMatiere.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomPrenom").value(hasItem(DEFAULT_NOM_PRENOM)));
    }

    @Test
    @Transactional
    void getComptableMatiere() throws Exception {
        // Initialize the database
        comptableMatiereRepository.saveAndFlush(comptableMatiere);

        // Get the comptableMatiere
        restComptableMatiereMockMvc
            .perform(get(ENTITY_API_URL_ID, comptableMatiere.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(comptableMatiere.getId().intValue()))
            .andExpect(jsonPath("$.nomPrenom").value(DEFAULT_NOM_PRENOM));
    }

    @Test
    @Transactional
    void getNonExistingComptableMatiere() throws Exception {
        // Get the comptableMatiere
        restComptableMatiereMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewComptableMatiere() throws Exception {
        // Initialize the database
        comptableMatiereRepository.saveAndFlush(comptableMatiere);

        int databaseSizeBeforeUpdate = comptableMatiereRepository.findAll().size();

        // Update the comptableMatiere
        ComptableMatiere updatedComptableMatiere = comptableMatiereRepository.findById(comptableMatiere.getId()).get();
        // Disconnect from session so that the updates on updatedComptableMatiere are not directly saved in db
        em.detach(updatedComptableMatiere);
        updatedComptableMatiere.nomPrenom(UPDATED_NOM_PRENOM);

        restComptableMatiereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedComptableMatiere.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedComptableMatiere))
            )
            .andExpect(status().isOk());

        // Validate the ComptableMatiere in the database
        List<ComptableMatiere> comptableMatiereList = comptableMatiereRepository.findAll();
        assertThat(comptableMatiereList).hasSize(databaseSizeBeforeUpdate);
        ComptableMatiere testComptableMatiere = comptableMatiereList.get(comptableMatiereList.size() - 1);
        assertThat(testComptableMatiere.getNomPrenom()).isEqualTo(UPDATED_NOM_PRENOM);
    }

    @Test
    @Transactional
    void putNonExistingComptableMatiere() throws Exception {
        int databaseSizeBeforeUpdate = comptableMatiereRepository.findAll().size();
        comptableMatiere.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restComptableMatiereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, comptableMatiere.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(comptableMatiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the ComptableMatiere in the database
        List<ComptableMatiere> comptableMatiereList = comptableMatiereRepository.findAll();
        assertThat(comptableMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchComptableMatiere() throws Exception {
        int databaseSizeBeforeUpdate = comptableMatiereRepository.findAll().size();
        comptableMatiere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restComptableMatiereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(comptableMatiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the ComptableMatiere in the database
        List<ComptableMatiere> comptableMatiereList = comptableMatiereRepository.findAll();
        assertThat(comptableMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamComptableMatiere() throws Exception {
        int databaseSizeBeforeUpdate = comptableMatiereRepository.findAll().size();
        comptableMatiere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restComptableMatiereMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(comptableMatiere))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ComptableMatiere in the database
        List<ComptableMatiere> comptableMatiereList = comptableMatiereRepository.findAll();
        assertThat(comptableMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateComptableMatiereWithPatch() throws Exception {
        // Initialize the database
        comptableMatiereRepository.saveAndFlush(comptableMatiere);

        int databaseSizeBeforeUpdate = comptableMatiereRepository.findAll().size();

        // Update the comptableMatiere using partial update
        ComptableMatiere partialUpdatedComptableMatiere = new ComptableMatiere();
        partialUpdatedComptableMatiere.setId(comptableMatiere.getId());

        partialUpdatedComptableMatiere.nomPrenom(UPDATED_NOM_PRENOM);

        restComptableMatiereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedComptableMatiere.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedComptableMatiere))
            )
            .andExpect(status().isOk());

        // Validate the ComptableMatiere in the database
        List<ComptableMatiere> comptableMatiereList = comptableMatiereRepository.findAll();
        assertThat(comptableMatiereList).hasSize(databaseSizeBeforeUpdate);
        ComptableMatiere testComptableMatiere = comptableMatiereList.get(comptableMatiereList.size() - 1);
        assertThat(testComptableMatiere.getNomPrenom()).isEqualTo(UPDATED_NOM_PRENOM);
    }

    @Test
    @Transactional
    void fullUpdateComptableMatiereWithPatch() throws Exception {
        // Initialize the database
        comptableMatiereRepository.saveAndFlush(comptableMatiere);

        int databaseSizeBeforeUpdate = comptableMatiereRepository.findAll().size();

        // Update the comptableMatiere using partial update
        ComptableMatiere partialUpdatedComptableMatiere = new ComptableMatiere();
        partialUpdatedComptableMatiere.setId(comptableMatiere.getId());

        partialUpdatedComptableMatiere.nomPrenom(UPDATED_NOM_PRENOM);

        restComptableMatiereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedComptableMatiere.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedComptableMatiere))
            )
            .andExpect(status().isOk());

        // Validate the ComptableMatiere in the database
        List<ComptableMatiere> comptableMatiereList = comptableMatiereRepository.findAll();
        assertThat(comptableMatiereList).hasSize(databaseSizeBeforeUpdate);
        ComptableMatiere testComptableMatiere = comptableMatiereList.get(comptableMatiereList.size() - 1);
        assertThat(testComptableMatiere.getNomPrenom()).isEqualTo(UPDATED_NOM_PRENOM);
    }

    @Test
    @Transactional
    void patchNonExistingComptableMatiere() throws Exception {
        int databaseSizeBeforeUpdate = comptableMatiereRepository.findAll().size();
        comptableMatiere.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restComptableMatiereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, comptableMatiere.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(comptableMatiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the ComptableMatiere in the database
        List<ComptableMatiere> comptableMatiereList = comptableMatiereRepository.findAll();
        assertThat(comptableMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchComptableMatiere() throws Exception {
        int databaseSizeBeforeUpdate = comptableMatiereRepository.findAll().size();
        comptableMatiere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restComptableMatiereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(comptableMatiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the ComptableMatiere in the database
        List<ComptableMatiere> comptableMatiereList = comptableMatiereRepository.findAll();
        assertThat(comptableMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamComptableMatiere() throws Exception {
        int databaseSizeBeforeUpdate = comptableMatiereRepository.findAll().size();
        comptableMatiere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restComptableMatiereMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(comptableMatiere))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ComptableMatiere in the database
        List<ComptableMatiere> comptableMatiereList = comptableMatiereRepository.findAll();
        assertThat(comptableMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteComptableMatiere() throws Exception {
        // Initialize the database
        comptableMatiereRepository.saveAndFlush(comptableMatiere);

        int databaseSizeBeforeDelete = comptableMatiereRepository.findAll().size();

        // Delete the comptableMatiere
        restComptableMatiereMockMvc
            .perform(delete(ENTITY_API_URL_ID, comptableMatiere.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ComptableMatiere> comptableMatiereList = comptableMatiereRepository.findAll();
        assertThat(comptableMatiereList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
