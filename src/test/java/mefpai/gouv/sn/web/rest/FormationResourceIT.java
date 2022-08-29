package mefpai.gouv.sn.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.Duration;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import mefpai.gouv.sn.IntegrationTest;
import mefpai.gouv.sn.domain.Formation;
import mefpai.gouv.sn.repository.FormationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link FormationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class FormationResourceIT {

    private static final String DEFAULT_NOM_FORMATION = "AAAAAAAAAA";
    private static final String UPDATED_NOM_FORMATION = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE_FORMATION = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_FORMATION = "BBBBBBBBBB";

    private static final String DEFAULT_NIVEAU_FORMATION = "AAAAAAAAAA";
    private static final String UPDATED_NIVEAU_FORMATION = "BBBBBBBBBB";

    private static final Duration DEFAULT_DUREE = Duration.ofHours(6);
    private static final Duration UPDATED_DUREE = Duration.ofHours(12);

    private static final String DEFAULT_SECTEUR = "AAAAAAAAAA";
    private static final String UPDATED_SECTEUR = "BBBBBBBBBB";

    private static final String DEFAULT_MODALITE = "AAAAAAAAAA";
    private static final String UPDATED_MODALITE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/formations";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FormationRepository formationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFormationMockMvc;

    private Formation formation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Formation createEntity(EntityManager em) {
        Formation formation = new Formation()
            .nomFormation(DEFAULT_NOM_FORMATION)
            .typeFormation(DEFAULT_TYPE_FORMATION)
            .niveauFormation(DEFAULT_NIVEAU_FORMATION)
            .duree(DEFAULT_DUREE)
            .secteur(DEFAULT_SECTEUR)
            .modalite(DEFAULT_MODALITE);
        return formation;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Formation createUpdatedEntity(EntityManager em) {
        Formation formation = new Formation()
            .nomFormation(UPDATED_NOM_FORMATION)
            .typeFormation(UPDATED_TYPE_FORMATION)
            .niveauFormation(UPDATED_NIVEAU_FORMATION)
            .duree(UPDATED_DUREE)
            .secteur(UPDATED_SECTEUR)
            .modalite(UPDATED_MODALITE);
        return formation;
    }

    @BeforeEach
    public void initTest() {
        formation = createEntity(em);
    }

    @Test
    @Transactional
    void createFormation() throws Exception {
        int databaseSizeBeforeCreate = formationRepository.findAll().size();
        // Create the Formation
        restFormationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(formation)))
            .andExpect(status().isCreated());

        // Validate the Formation in the database
        List<Formation> formationList = formationRepository.findAll();
        assertThat(formationList).hasSize(databaseSizeBeforeCreate + 1);
        Formation testFormation = formationList.get(formationList.size() - 1);
        assertThat(testFormation.getNomFormation()).isEqualTo(DEFAULT_NOM_FORMATION);
        assertThat(testFormation.getTypeFormation()).isEqualTo(DEFAULT_TYPE_FORMATION);
        assertThat(testFormation.getNiveauFormation()).isEqualTo(DEFAULT_NIVEAU_FORMATION);
        assertThat(testFormation.getDuree()).isEqualTo(DEFAULT_DUREE);
        assertThat(testFormation.getSecteur()).isEqualTo(DEFAULT_SECTEUR);
        assertThat(testFormation.getModalite()).isEqualTo(DEFAULT_MODALITE);
    }

    @Test
    @Transactional
    void createFormationWithExistingId() throws Exception {
        // Create the Formation with an existing ID
        formation.setId(1L);

        int databaseSizeBeforeCreate = formationRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(formation)))
            .andExpect(status().isBadRequest());

        // Validate the Formation in the database
        List<Formation> formationList = formationRepository.findAll();
        assertThat(formationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllFormations() throws Exception {
        // Initialize the database
        formationRepository.saveAndFlush(formation);

        // Get all the formationList
        restFormationMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(formation.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomFormation").value(hasItem(DEFAULT_NOM_FORMATION)))
            .andExpect(jsonPath("$.[*].typeFormation").value(hasItem(DEFAULT_TYPE_FORMATION)))
            .andExpect(jsonPath("$.[*].niveauFormation").value(hasItem(DEFAULT_NIVEAU_FORMATION)))
            .andExpect(jsonPath("$.[*].duree").value(hasItem(DEFAULT_DUREE.toString())))
            .andExpect(jsonPath("$.[*].secteur").value(hasItem(DEFAULT_SECTEUR)))
            .andExpect(jsonPath("$.[*].modalite").value(hasItem(DEFAULT_MODALITE)));
    }

    @Test
    @Transactional
    void getFormation() throws Exception {
        // Initialize the database
        formationRepository.saveAndFlush(formation);

        // Get the formation
        restFormationMockMvc
            .perform(get(ENTITY_API_URL_ID, formation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(formation.getId().intValue()))
            .andExpect(jsonPath("$.nomFormation").value(DEFAULT_NOM_FORMATION))
            .andExpect(jsonPath("$.typeFormation").value(DEFAULT_TYPE_FORMATION))
            .andExpect(jsonPath("$.niveauFormation").value(DEFAULT_NIVEAU_FORMATION))
            .andExpect(jsonPath("$.duree").value(DEFAULT_DUREE.toString()))
            .andExpect(jsonPath("$.secteur").value(DEFAULT_SECTEUR))
            .andExpect(jsonPath("$.modalite").value(DEFAULT_MODALITE));
    }

    @Test
    @Transactional
    void getNonExistingFormation() throws Exception {
        // Get the formation
        restFormationMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewFormation() throws Exception {
        // Initialize the database
        formationRepository.saveAndFlush(formation);

        int databaseSizeBeforeUpdate = formationRepository.findAll().size();

        // Update the formation
        Formation updatedFormation = formationRepository.findById(formation.getId()).get();
        // Disconnect from session so that the updates on updatedFormation are not directly saved in db
        em.detach(updatedFormation);
        updatedFormation
            .nomFormation(UPDATED_NOM_FORMATION)
            .typeFormation(UPDATED_TYPE_FORMATION)
            .niveauFormation(UPDATED_NIVEAU_FORMATION)
            .duree(UPDATED_DUREE)
            .secteur(UPDATED_SECTEUR)
            .modalite(UPDATED_MODALITE);

        restFormationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedFormation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedFormation))
            )
            .andExpect(status().isOk());

        // Validate the Formation in the database
        List<Formation> formationList = formationRepository.findAll();
        assertThat(formationList).hasSize(databaseSizeBeforeUpdate);
        Formation testFormation = formationList.get(formationList.size() - 1);
        assertThat(testFormation.getNomFormation()).isEqualTo(UPDATED_NOM_FORMATION);
        assertThat(testFormation.getTypeFormation()).isEqualTo(UPDATED_TYPE_FORMATION);
        assertThat(testFormation.getNiveauFormation()).isEqualTo(UPDATED_NIVEAU_FORMATION);
        assertThat(testFormation.getDuree()).isEqualTo(UPDATED_DUREE);
        assertThat(testFormation.getSecteur()).isEqualTo(UPDATED_SECTEUR);
        assertThat(testFormation.getModalite()).isEqualTo(UPDATED_MODALITE);
    }

    @Test
    @Transactional
    void putNonExistingFormation() throws Exception {
        int databaseSizeBeforeUpdate = formationRepository.findAll().size();
        formation.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFormationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, formation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(formation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Formation in the database
        List<Formation> formationList = formationRepository.findAll();
        assertThat(formationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchFormation() throws Exception {
        int databaseSizeBeforeUpdate = formationRepository.findAll().size();
        formation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFormationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(formation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Formation in the database
        List<Formation> formationList = formationRepository.findAll();
        assertThat(formationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamFormation() throws Exception {
        int databaseSizeBeforeUpdate = formationRepository.findAll().size();
        formation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFormationMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(formation)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Formation in the database
        List<Formation> formationList = formationRepository.findAll();
        assertThat(formationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateFormationWithPatch() throws Exception {
        // Initialize the database
        formationRepository.saveAndFlush(formation);

        int databaseSizeBeforeUpdate = formationRepository.findAll().size();

        // Update the formation using partial update
        Formation partialUpdatedFormation = new Formation();
        partialUpdatedFormation.setId(formation.getId());

        partialUpdatedFormation.secteur(UPDATED_SECTEUR);

        restFormationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFormation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFormation))
            )
            .andExpect(status().isOk());

        // Validate the Formation in the database
        List<Formation> formationList = formationRepository.findAll();
        assertThat(formationList).hasSize(databaseSizeBeforeUpdate);
        Formation testFormation = formationList.get(formationList.size() - 1);
        assertThat(testFormation.getNomFormation()).isEqualTo(DEFAULT_NOM_FORMATION);
        assertThat(testFormation.getTypeFormation()).isEqualTo(DEFAULT_TYPE_FORMATION);
        assertThat(testFormation.getNiveauFormation()).isEqualTo(DEFAULT_NIVEAU_FORMATION);
        assertThat(testFormation.getDuree()).isEqualTo(DEFAULT_DUREE);
        assertThat(testFormation.getSecteur()).isEqualTo(UPDATED_SECTEUR);
        assertThat(testFormation.getModalite()).isEqualTo(DEFAULT_MODALITE);
    }

    @Test
    @Transactional
    void fullUpdateFormationWithPatch() throws Exception {
        // Initialize the database
        formationRepository.saveAndFlush(formation);

        int databaseSizeBeforeUpdate = formationRepository.findAll().size();

        // Update the formation using partial update
        Formation partialUpdatedFormation = new Formation();
        partialUpdatedFormation.setId(formation.getId());

        partialUpdatedFormation
            .nomFormation(UPDATED_NOM_FORMATION)
            .typeFormation(UPDATED_TYPE_FORMATION)
            .niveauFormation(UPDATED_NIVEAU_FORMATION)
            .duree(UPDATED_DUREE)
            .secteur(UPDATED_SECTEUR)
            .modalite(UPDATED_MODALITE);

        restFormationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFormation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFormation))
            )
            .andExpect(status().isOk());

        // Validate the Formation in the database
        List<Formation> formationList = formationRepository.findAll();
        assertThat(formationList).hasSize(databaseSizeBeforeUpdate);
        Formation testFormation = formationList.get(formationList.size() - 1);
        assertThat(testFormation.getNomFormation()).isEqualTo(UPDATED_NOM_FORMATION);
        assertThat(testFormation.getTypeFormation()).isEqualTo(UPDATED_TYPE_FORMATION);
        assertThat(testFormation.getNiveauFormation()).isEqualTo(UPDATED_NIVEAU_FORMATION);
        assertThat(testFormation.getDuree()).isEqualTo(UPDATED_DUREE);
        assertThat(testFormation.getSecteur()).isEqualTo(UPDATED_SECTEUR);
        assertThat(testFormation.getModalite()).isEqualTo(UPDATED_MODALITE);
    }

    @Test
    @Transactional
    void patchNonExistingFormation() throws Exception {
        int databaseSizeBeforeUpdate = formationRepository.findAll().size();
        formation.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFormationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, formation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(formation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Formation in the database
        List<Formation> formationList = formationRepository.findAll();
        assertThat(formationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchFormation() throws Exception {
        int databaseSizeBeforeUpdate = formationRepository.findAll().size();
        formation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFormationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(formation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Formation in the database
        List<Formation> formationList = formationRepository.findAll();
        assertThat(formationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamFormation() throws Exception {
        int databaseSizeBeforeUpdate = formationRepository.findAll().size();
        formation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFormationMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(formation))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Formation in the database
        List<Formation> formationList = formationRepository.findAll();
        assertThat(formationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteFormation() throws Exception {
        // Initialize the database
        formationRepository.saveAndFlush(formation);

        int databaseSizeBeforeDelete = formationRepository.findAll().size();

        // Delete the formation
        restFormationMockMvc
            .perform(delete(ENTITY_API_URL_ID, formation.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Formation> formationList = formationRepository.findAll();
        assertThat(formationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
