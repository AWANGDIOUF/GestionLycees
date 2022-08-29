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
import mefpai.gouv.sn.domain.Materiel;
import mefpai.gouv.sn.domain.enumeration.Categorie;
import mefpai.gouv.sn.domain.enumeration.EtatMateriel;
import mefpai.gouv.sn.repository.MaterielRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link MaterielResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MaterielResourceIT {

    private static final Categorie DEFAULT_CATEGORIE_MATERIEL = Categorie.INFORMATIQUE;
    private static final Categorie UPDATED_CATEGORIE_MATERIEL = Categorie.MOBILIER;

    private static final EtatMateriel DEFAULT_ETAT_MATERIEL = EtatMateriel.BON;
    private static final EtatMateriel UPDATED_ETAT_MATERIEL = EtatMateriel.MOYEN;

    private static final String ENTITY_API_URL = "/api/materiels";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MaterielRepository materielRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMaterielMockMvc;

    private Materiel materiel;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Materiel createEntity(EntityManager em) {
        Materiel materiel = new Materiel().categorieMateriel(DEFAULT_CATEGORIE_MATERIEL).etatMateriel(DEFAULT_ETAT_MATERIEL);
        return materiel;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Materiel createUpdatedEntity(EntityManager em) {
        Materiel materiel = new Materiel().categorieMateriel(UPDATED_CATEGORIE_MATERIEL).etatMateriel(UPDATED_ETAT_MATERIEL);
        return materiel;
    }

    @BeforeEach
    public void initTest() {
        materiel = createEntity(em);
    }

    @Test
    @Transactional
    void createMateriel() throws Exception {
        int databaseSizeBeforeCreate = materielRepository.findAll().size();
        // Create the Materiel
        restMaterielMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(materiel)))
            .andExpect(status().isCreated());

        // Validate the Materiel in the database
        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeCreate + 1);
        Materiel testMateriel = materielList.get(materielList.size() - 1);
        assertThat(testMateriel.getCategorieMateriel()).isEqualTo(DEFAULT_CATEGORIE_MATERIEL);
        assertThat(testMateriel.getEtatMateriel()).isEqualTo(DEFAULT_ETAT_MATERIEL);
    }

    @Test
    @Transactional
    void createMaterielWithExistingId() throws Exception {
        // Create the Materiel with an existing ID
        materiel.setId(1L);

        int databaseSizeBeforeCreate = materielRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMaterielMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(materiel)))
            .andExpect(status().isBadRequest());

        // Validate the Materiel in the database
        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCategorieMaterielIsRequired() throws Exception {
        int databaseSizeBeforeTest = materielRepository.findAll().size();
        // set the field null
        materiel.setCategorieMateriel(null);

        // Create the Materiel, which fails.

        restMaterielMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(materiel)))
            .andExpect(status().isBadRequest());

        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEtatMaterielIsRequired() throws Exception {
        int databaseSizeBeforeTest = materielRepository.findAll().size();
        // set the field null
        materiel.setEtatMateriel(null);

        // Create the Materiel, which fails.

        restMaterielMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(materiel)))
            .andExpect(status().isBadRequest());

        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllMateriels() throws Exception {
        // Initialize the database
        materielRepository.saveAndFlush(materiel);

        // Get all the materielList
        restMaterielMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(materiel.getId().intValue())))
            .andExpect(jsonPath("$.[*].categorieMateriel").value(hasItem(DEFAULT_CATEGORIE_MATERIEL.toString())))
            .andExpect(jsonPath("$.[*].etatMateriel").value(hasItem(DEFAULT_ETAT_MATERIEL.toString())));
    }

    @Test
    @Transactional
    void getMateriel() throws Exception {
        // Initialize the database
        materielRepository.saveAndFlush(materiel);

        // Get the materiel
        restMaterielMockMvc
            .perform(get(ENTITY_API_URL_ID, materiel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(materiel.getId().intValue()))
            .andExpect(jsonPath("$.categorieMateriel").value(DEFAULT_CATEGORIE_MATERIEL.toString()))
            .andExpect(jsonPath("$.etatMateriel").value(DEFAULT_ETAT_MATERIEL.toString()));
    }

    @Test
    @Transactional
    void getNonExistingMateriel() throws Exception {
        // Get the materiel
        restMaterielMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMateriel() throws Exception {
        // Initialize the database
        materielRepository.saveAndFlush(materiel);

        int databaseSizeBeforeUpdate = materielRepository.findAll().size();

        // Update the materiel
        Materiel updatedMateriel = materielRepository.findById(materiel.getId()).get();
        // Disconnect from session so that the updates on updatedMateriel are not directly saved in db
        em.detach(updatedMateriel);
        updatedMateriel.categorieMateriel(UPDATED_CATEGORIE_MATERIEL).etatMateriel(UPDATED_ETAT_MATERIEL);

        restMaterielMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMateriel.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMateriel))
            )
            .andExpect(status().isOk());

        // Validate the Materiel in the database
        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeUpdate);
        Materiel testMateriel = materielList.get(materielList.size() - 1);
        assertThat(testMateriel.getCategorieMateriel()).isEqualTo(UPDATED_CATEGORIE_MATERIEL);
        assertThat(testMateriel.getEtatMateriel()).isEqualTo(UPDATED_ETAT_MATERIEL);
    }

    @Test
    @Transactional
    void putNonExistingMateriel() throws Exception {
        int databaseSizeBeforeUpdate = materielRepository.findAll().size();
        materiel.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMaterielMockMvc
            .perform(
                put(ENTITY_API_URL_ID, materiel.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(materiel))
            )
            .andExpect(status().isBadRequest());

        // Validate the Materiel in the database
        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMateriel() throws Exception {
        int databaseSizeBeforeUpdate = materielRepository.findAll().size();
        materiel.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMaterielMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(materiel))
            )
            .andExpect(status().isBadRequest());

        // Validate the Materiel in the database
        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMateriel() throws Exception {
        int databaseSizeBeforeUpdate = materielRepository.findAll().size();
        materiel.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMaterielMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(materiel)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Materiel in the database
        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMaterielWithPatch() throws Exception {
        // Initialize the database
        materielRepository.saveAndFlush(materiel);

        int databaseSizeBeforeUpdate = materielRepository.findAll().size();

        // Update the materiel using partial update
        Materiel partialUpdatedMateriel = new Materiel();
        partialUpdatedMateriel.setId(materiel.getId());

        partialUpdatedMateriel.categorieMateriel(UPDATED_CATEGORIE_MATERIEL).etatMateriel(UPDATED_ETAT_MATERIEL);

        restMaterielMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMateriel.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMateriel))
            )
            .andExpect(status().isOk());

        // Validate the Materiel in the database
        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeUpdate);
        Materiel testMateriel = materielList.get(materielList.size() - 1);
        assertThat(testMateriel.getCategorieMateriel()).isEqualTo(UPDATED_CATEGORIE_MATERIEL);
        assertThat(testMateriel.getEtatMateriel()).isEqualTo(UPDATED_ETAT_MATERIEL);
    }

    @Test
    @Transactional
    void fullUpdateMaterielWithPatch() throws Exception {
        // Initialize the database
        materielRepository.saveAndFlush(materiel);

        int databaseSizeBeforeUpdate = materielRepository.findAll().size();

        // Update the materiel using partial update
        Materiel partialUpdatedMateriel = new Materiel();
        partialUpdatedMateriel.setId(materiel.getId());

        partialUpdatedMateriel.categorieMateriel(UPDATED_CATEGORIE_MATERIEL).etatMateriel(UPDATED_ETAT_MATERIEL);

        restMaterielMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMateriel.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMateriel))
            )
            .andExpect(status().isOk());

        // Validate the Materiel in the database
        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeUpdate);
        Materiel testMateriel = materielList.get(materielList.size() - 1);
        assertThat(testMateriel.getCategorieMateriel()).isEqualTo(UPDATED_CATEGORIE_MATERIEL);
        assertThat(testMateriel.getEtatMateriel()).isEqualTo(UPDATED_ETAT_MATERIEL);
    }

    @Test
    @Transactional
    void patchNonExistingMateriel() throws Exception {
        int databaseSizeBeforeUpdate = materielRepository.findAll().size();
        materiel.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMaterielMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, materiel.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(materiel))
            )
            .andExpect(status().isBadRequest());

        // Validate the Materiel in the database
        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMateriel() throws Exception {
        int databaseSizeBeforeUpdate = materielRepository.findAll().size();
        materiel.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMaterielMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(materiel))
            )
            .andExpect(status().isBadRequest());

        // Validate the Materiel in the database
        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMateriel() throws Exception {
        int databaseSizeBeforeUpdate = materielRepository.findAll().size();
        materiel.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMaterielMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(materiel)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Materiel in the database
        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMateriel() throws Exception {
        // Initialize the database
        materielRepository.saveAndFlush(materiel);

        int databaseSizeBeforeDelete = materielRepository.findAll().size();

        // Delete the materiel
        restMaterielMockMvc
            .perform(delete(ENTITY_API_URL_ID, materiel.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
