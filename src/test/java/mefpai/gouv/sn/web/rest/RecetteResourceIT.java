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
import mefpai.gouv.sn.domain.Recette;
import mefpai.gouv.sn.domain.enumeration.TypeR;
import mefpai.gouv.sn.repository.RecetteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link RecetteResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RecetteResourceIT {

    private static final TypeR DEFAULT_TYPE = TypeR.SUBVENTION_ETAT;
    private static final TypeR UPDATED_TYPE = TypeR.RESSOURCES_GENEREES;

    private static final String DEFAULT_AUTRE_RECETTE = "AAAAAAAAAA";
    private static final String UPDATED_AUTRE_RECETTE = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE_RESSOURCE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_RESSOURCE = "BBBBBBBBBB";

    private static final String DEFAULT_MONTANT = "AAAAAAAAAA";
    private static final String UPDATED_MONTANT = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/recettes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RecetteRepository recetteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRecetteMockMvc;

    private Recette recette;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Recette createEntity(EntityManager em) {
        Recette recette = new Recette()
            .type(DEFAULT_TYPE)
            .autreRecette(DEFAULT_AUTRE_RECETTE)
            .typeRessource(DEFAULT_TYPE_RESSOURCE)
            .montant(DEFAULT_MONTANT)
            .date(DEFAULT_DATE);
        return recette;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Recette createUpdatedEntity(EntityManager em) {
        Recette recette = new Recette()
            .type(UPDATED_TYPE)
            .autreRecette(UPDATED_AUTRE_RECETTE)
            .typeRessource(UPDATED_TYPE_RESSOURCE)
            .montant(UPDATED_MONTANT)
            .date(UPDATED_DATE);
        return recette;
    }

    @BeforeEach
    public void initTest() {
        recette = createEntity(em);
    }

    @Test
    @Transactional
    void createRecette() throws Exception {
        int databaseSizeBeforeCreate = recetteRepository.findAll().size();
        // Create the Recette
        restRecetteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(recette)))
            .andExpect(status().isCreated());

        // Validate the Recette in the database
        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeCreate + 1);
        Recette testRecette = recetteList.get(recetteList.size() - 1);
        assertThat(testRecette.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testRecette.getAutreRecette()).isEqualTo(DEFAULT_AUTRE_RECETTE);
        assertThat(testRecette.getTypeRessource()).isEqualTo(DEFAULT_TYPE_RESSOURCE);
        assertThat(testRecette.getMontant()).isEqualTo(DEFAULT_MONTANT);
        assertThat(testRecette.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    void createRecetteWithExistingId() throws Exception {
        // Create the Recette with an existing ID
        recette.setId(1L);

        int databaseSizeBeforeCreate = recetteRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecetteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(recette)))
            .andExpect(status().isBadRequest());

        // Validate the Recette in the database
        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = recetteRepository.findAll().size();
        // set the field null
        recette.setType(null);

        // Create the Recette, which fails.

        restRecetteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(recette)))
            .andExpect(status().isBadRequest());

        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = recetteRepository.findAll().size();
        // set the field null
        recette.setDate(null);

        // Create the Recette, which fails.

        restRecetteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(recette)))
            .andExpect(status().isBadRequest());

        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllRecettes() throws Exception {
        // Initialize the database
        recetteRepository.saveAndFlush(recette);

        // Get all the recetteList
        restRecetteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recette.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].autreRecette").value(hasItem(DEFAULT_AUTRE_RECETTE)))
            .andExpect(jsonPath("$.[*].typeRessource").value(hasItem(DEFAULT_TYPE_RESSOURCE)))
            .andExpect(jsonPath("$.[*].montant").value(hasItem(DEFAULT_MONTANT)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    void getRecette() throws Exception {
        // Initialize the database
        recetteRepository.saveAndFlush(recette);

        // Get the recette
        restRecetteMockMvc
            .perform(get(ENTITY_API_URL_ID, recette.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(recette.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.autreRecette").value(DEFAULT_AUTRE_RECETTE))
            .andExpect(jsonPath("$.typeRessource").value(DEFAULT_TYPE_RESSOURCE))
            .andExpect(jsonPath("$.montant").value(DEFAULT_MONTANT))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingRecette() throws Exception {
        // Get the recette
        restRecetteMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewRecette() throws Exception {
        // Initialize the database
        recetteRepository.saveAndFlush(recette);

        int databaseSizeBeforeUpdate = recetteRepository.findAll().size();

        // Update the recette
        Recette updatedRecette = recetteRepository.findById(recette.getId()).get();
        // Disconnect from session so that the updates on updatedRecette are not directly saved in db
        em.detach(updatedRecette);
        updatedRecette
            .type(UPDATED_TYPE)
            .autreRecette(UPDATED_AUTRE_RECETTE)
            .typeRessource(UPDATED_TYPE_RESSOURCE)
            .montant(UPDATED_MONTANT)
            .date(UPDATED_DATE);

        restRecetteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRecette.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRecette))
            )
            .andExpect(status().isOk());

        // Validate the Recette in the database
        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeUpdate);
        Recette testRecette = recetteList.get(recetteList.size() - 1);
        assertThat(testRecette.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testRecette.getAutreRecette()).isEqualTo(UPDATED_AUTRE_RECETTE);
        assertThat(testRecette.getTypeRessource()).isEqualTo(UPDATED_TYPE_RESSOURCE);
        assertThat(testRecette.getMontant()).isEqualTo(UPDATED_MONTANT);
        assertThat(testRecette.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    void putNonExistingRecette() throws Exception {
        int databaseSizeBeforeUpdate = recetteRepository.findAll().size();
        recette.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecetteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, recette.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(recette))
            )
            .andExpect(status().isBadRequest());

        // Validate the Recette in the database
        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRecette() throws Exception {
        int databaseSizeBeforeUpdate = recetteRepository.findAll().size();
        recette.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRecetteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(recette))
            )
            .andExpect(status().isBadRequest());

        // Validate the Recette in the database
        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRecette() throws Exception {
        int databaseSizeBeforeUpdate = recetteRepository.findAll().size();
        recette.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRecetteMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(recette)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Recette in the database
        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRecetteWithPatch() throws Exception {
        // Initialize the database
        recetteRepository.saveAndFlush(recette);

        int databaseSizeBeforeUpdate = recetteRepository.findAll().size();

        // Update the recette using partial update
        Recette partialUpdatedRecette = new Recette();
        partialUpdatedRecette.setId(recette.getId());

        restRecetteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRecette.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRecette))
            )
            .andExpect(status().isOk());

        // Validate the Recette in the database
        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeUpdate);
        Recette testRecette = recetteList.get(recetteList.size() - 1);
        assertThat(testRecette.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testRecette.getAutreRecette()).isEqualTo(DEFAULT_AUTRE_RECETTE);
        assertThat(testRecette.getTypeRessource()).isEqualTo(DEFAULT_TYPE_RESSOURCE);
        assertThat(testRecette.getMontant()).isEqualTo(DEFAULT_MONTANT);
        assertThat(testRecette.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    void fullUpdateRecetteWithPatch() throws Exception {
        // Initialize the database
        recetteRepository.saveAndFlush(recette);

        int databaseSizeBeforeUpdate = recetteRepository.findAll().size();

        // Update the recette using partial update
        Recette partialUpdatedRecette = new Recette();
        partialUpdatedRecette.setId(recette.getId());

        partialUpdatedRecette
            .type(UPDATED_TYPE)
            .autreRecette(UPDATED_AUTRE_RECETTE)
            .typeRessource(UPDATED_TYPE_RESSOURCE)
            .montant(UPDATED_MONTANT)
            .date(UPDATED_DATE);

        restRecetteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRecette.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRecette))
            )
            .andExpect(status().isOk());

        // Validate the Recette in the database
        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeUpdate);
        Recette testRecette = recetteList.get(recetteList.size() - 1);
        assertThat(testRecette.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testRecette.getAutreRecette()).isEqualTo(UPDATED_AUTRE_RECETTE);
        assertThat(testRecette.getTypeRessource()).isEqualTo(UPDATED_TYPE_RESSOURCE);
        assertThat(testRecette.getMontant()).isEqualTo(UPDATED_MONTANT);
        assertThat(testRecette.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    void patchNonExistingRecette() throws Exception {
        int databaseSizeBeforeUpdate = recetteRepository.findAll().size();
        recette.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecetteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, recette.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(recette))
            )
            .andExpect(status().isBadRequest());

        // Validate the Recette in the database
        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRecette() throws Exception {
        int databaseSizeBeforeUpdate = recetteRepository.findAll().size();
        recette.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRecetteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(recette))
            )
            .andExpect(status().isBadRequest());

        // Validate the Recette in the database
        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRecette() throws Exception {
        int databaseSizeBeforeUpdate = recetteRepository.findAll().size();
        recette.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRecetteMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(recette)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Recette in the database
        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRecette() throws Exception {
        // Initialize the database
        recetteRepository.saveAndFlush(recette);

        int databaseSizeBeforeDelete = recetteRepository.findAll().size();

        // Delete the recette
        restRecetteMockMvc
            .perform(delete(ENTITY_API_URL_ID, recette.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
