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
import mefpai.gouv.sn.domain.Partenaire;
import mefpai.gouv.sn.domain.enumeration.NaturePart;
import mefpai.gouv.sn.domain.enumeration.Provenance;
import mefpai.gouv.sn.repository.PartenaireRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PartenaireResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PartenaireResourceIT {

    private static final String DEFAULT_DENOMINATION_PARTENAIRE = "AAAAAAAAAA";
    private static final String UPDATED_DENOMINATION_PARTENAIRE = "BBBBBBBBBB";

    private static final Provenance DEFAULT_CATEGORIE_PROVENAIRE = Provenance.ENTREPRISE;
    private static final Provenance UPDATED_CATEGORIE_PROVENAIRE = Provenance.ONG;

    private static final String DEFAULT_AUTRE_CATEGORIE = "AAAAAAAAAA";
    private static final String UPDATED_AUTRE_CATEGORIE = "BBBBBBBBBB";

    private static final NaturePart DEFAULT_NATURE = NaturePart.TECHNIQUE;
    private static final NaturePart UPDATED_NATURE = NaturePart.FINANCIER;

    private static final String DEFAULT_AUTRE_NATURE = "AAAAAAAAAA";
    private static final String UPDATED_AUTRE_NATURE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/partenaires";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PartenaireRepository partenaireRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPartenaireMockMvc;

    private Partenaire partenaire;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Partenaire createEntity(EntityManager em) {
        Partenaire partenaire = new Partenaire()
            .denominationPartenaire(DEFAULT_DENOMINATION_PARTENAIRE)
            .categorieProvenaire(DEFAULT_CATEGORIE_PROVENAIRE)
            .autreCategorie(DEFAULT_AUTRE_CATEGORIE)
            .nature(DEFAULT_NATURE)
            .autreNature(DEFAULT_AUTRE_NATURE);
        return partenaire;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Partenaire createUpdatedEntity(EntityManager em) {
        Partenaire partenaire = new Partenaire()
            .denominationPartenaire(UPDATED_DENOMINATION_PARTENAIRE)
            .categorieProvenaire(UPDATED_CATEGORIE_PROVENAIRE)
            .autreCategorie(UPDATED_AUTRE_CATEGORIE)
            .nature(UPDATED_NATURE)
            .autreNature(UPDATED_AUTRE_NATURE);
        return partenaire;
    }

    @BeforeEach
    public void initTest() {
        partenaire = createEntity(em);
    }

    @Test
    @Transactional
    void createPartenaire() throws Exception {
        int databaseSizeBeforeCreate = partenaireRepository.findAll().size();
        // Create the Partenaire
        restPartenaireMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(partenaire)))
            .andExpect(status().isCreated());

        // Validate the Partenaire in the database
        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeCreate + 1);
        Partenaire testPartenaire = partenaireList.get(partenaireList.size() - 1);
        assertThat(testPartenaire.getDenominationPartenaire()).isEqualTo(DEFAULT_DENOMINATION_PARTENAIRE);
        assertThat(testPartenaire.getCategorieProvenaire()).isEqualTo(DEFAULT_CATEGORIE_PROVENAIRE);
        assertThat(testPartenaire.getAutreCategorie()).isEqualTo(DEFAULT_AUTRE_CATEGORIE);
        assertThat(testPartenaire.getNature()).isEqualTo(DEFAULT_NATURE);
        assertThat(testPartenaire.getAutreNature()).isEqualTo(DEFAULT_AUTRE_NATURE);
    }

    @Test
    @Transactional
    void createPartenaireWithExistingId() throws Exception {
        // Create the Partenaire with an existing ID
        partenaire.setId(1L);

        int databaseSizeBeforeCreate = partenaireRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPartenaireMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(partenaire)))
            .andExpect(status().isBadRequest());

        // Validate the Partenaire in the database
        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDenominationPartenaireIsRequired() throws Exception {
        int databaseSizeBeforeTest = partenaireRepository.findAll().size();
        // set the field null
        partenaire.setDenominationPartenaire(null);

        // Create the Partenaire, which fails.

        restPartenaireMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(partenaire)))
            .andExpect(status().isBadRequest());

        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCategorieProvenaireIsRequired() throws Exception {
        int databaseSizeBeforeTest = partenaireRepository.findAll().size();
        // set the field null
        partenaire.setCategorieProvenaire(null);

        // Create the Partenaire, which fails.

        restPartenaireMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(partenaire)))
            .andExpect(status().isBadRequest());

        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkNatureIsRequired() throws Exception {
        int databaseSizeBeforeTest = partenaireRepository.findAll().size();
        // set the field null
        partenaire.setNature(null);

        // Create the Partenaire, which fails.

        restPartenaireMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(partenaire)))
            .andExpect(status().isBadRequest());

        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPartenaires() throws Exception {
        // Initialize the database
        partenaireRepository.saveAndFlush(partenaire);

        // Get all the partenaireList
        restPartenaireMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(partenaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].denominationPartenaire").value(hasItem(DEFAULT_DENOMINATION_PARTENAIRE)))
            .andExpect(jsonPath("$.[*].categorieProvenaire").value(hasItem(DEFAULT_CATEGORIE_PROVENAIRE.toString())))
            .andExpect(jsonPath("$.[*].autreCategorie").value(hasItem(DEFAULT_AUTRE_CATEGORIE)))
            .andExpect(jsonPath("$.[*].nature").value(hasItem(DEFAULT_NATURE.toString())))
            .andExpect(jsonPath("$.[*].autreNature").value(hasItem(DEFAULT_AUTRE_NATURE)));
    }

    @Test
    @Transactional
    void getPartenaire() throws Exception {
        // Initialize the database
        partenaireRepository.saveAndFlush(partenaire);

        // Get the partenaire
        restPartenaireMockMvc
            .perform(get(ENTITY_API_URL_ID, partenaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(partenaire.getId().intValue()))
            .andExpect(jsonPath("$.denominationPartenaire").value(DEFAULT_DENOMINATION_PARTENAIRE))
            .andExpect(jsonPath("$.categorieProvenaire").value(DEFAULT_CATEGORIE_PROVENAIRE.toString()))
            .andExpect(jsonPath("$.autreCategorie").value(DEFAULT_AUTRE_CATEGORIE))
            .andExpect(jsonPath("$.nature").value(DEFAULT_NATURE.toString()))
            .andExpect(jsonPath("$.autreNature").value(DEFAULT_AUTRE_NATURE));
    }

    @Test
    @Transactional
    void getNonExistingPartenaire() throws Exception {
        // Get the partenaire
        restPartenaireMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPartenaire() throws Exception {
        // Initialize the database
        partenaireRepository.saveAndFlush(partenaire);

        int databaseSizeBeforeUpdate = partenaireRepository.findAll().size();

        // Update the partenaire
        Partenaire updatedPartenaire = partenaireRepository.findById(partenaire.getId()).get();
        // Disconnect from session so that the updates on updatedPartenaire are not directly saved in db
        em.detach(updatedPartenaire);
        updatedPartenaire
            .denominationPartenaire(UPDATED_DENOMINATION_PARTENAIRE)
            .categorieProvenaire(UPDATED_CATEGORIE_PROVENAIRE)
            .autreCategorie(UPDATED_AUTRE_CATEGORIE)
            .nature(UPDATED_NATURE)
            .autreNature(UPDATED_AUTRE_NATURE);

        restPartenaireMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPartenaire.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPartenaire))
            )
            .andExpect(status().isOk());

        // Validate the Partenaire in the database
        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeUpdate);
        Partenaire testPartenaire = partenaireList.get(partenaireList.size() - 1);
        assertThat(testPartenaire.getDenominationPartenaire()).isEqualTo(UPDATED_DENOMINATION_PARTENAIRE);
        assertThat(testPartenaire.getCategorieProvenaire()).isEqualTo(UPDATED_CATEGORIE_PROVENAIRE);
        assertThat(testPartenaire.getAutreCategorie()).isEqualTo(UPDATED_AUTRE_CATEGORIE);
        assertThat(testPartenaire.getNature()).isEqualTo(UPDATED_NATURE);
        assertThat(testPartenaire.getAutreNature()).isEqualTo(UPDATED_AUTRE_NATURE);
    }

    @Test
    @Transactional
    void putNonExistingPartenaire() throws Exception {
        int databaseSizeBeforeUpdate = partenaireRepository.findAll().size();
        partenaire.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPartenaireMockMvc
            .perform(
                put(ENTITY_API_URL_ID, partenaire.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(partenaire))
            )
            .andExpect(status().isBadRequest());

        // Validate the Partenaire in the database
        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPartenaire() throws Exception {
        int databaseSizeBeforeUpdate = partenaireRepository.findAll().size();
        partenaire.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPartenaireMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(partenaire))
            )
            .andExpect(status().isBadRequest());

        // Validate the Partenaire in the database
        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPartenaire() throws Exception {
        int databaseSizeBeforeUpdate = partenaireRepository.findAll().size();
        partenaire.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPartenaireMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(partenaire)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Partenaire in the database
        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePartenaireWithPatch() throws Exception {
        // Initialize the database
        partenaireRepository.saveAndFlush(partenaire);

        int databaseSizeBeforeUpdate = partenaireRepository.findAll().size();

        // Update the partenaire using partial update
        Partenaire partialUpdatedPartenaire = new Partenaire();
        partialUpdatedPartenaire.setId(partenaire.getId());

        partialUpdatedPartenaire.categorieProvenaire(UPDATED_CATEGORIE_PROVENAIRE).nature(UPDATED_NATURE);

        restPartenaireMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPartenaire.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPartenaire))
            )
            .andExpect(status().isOk());

        // Validate the Partenaire in the database
        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeUpdate);
        Partenaire testPartenaire = partenaireList.get(partenaireList.size() - 1);
        assertThat(testPartenaire.getDenominationPartenaire()).isEqualTo(DEFAULT_DENOMINATION_PARTENAIRE);
        assertThat(testPartenaire.getCategorieProvenaire()).isEqualTo(UPDATED_CATEGORIE_PROVENAIRE);
        assertThat(testPartenaire.getAutreCategorie()).isEqualTo(DEFAULT_AUTRE_CATEGORIE);
        assertThat(testPartenaire.getNature()).isEqualTo(UPDATED_NATURE);
        assertThat(testPartenaire.getAutreNature()).isEqualTo(DEFAULT_AUTRE_NATURE);
    }

    @Test
    @Transactional
    void fullUpdatePartenaireWithPatch() throws Exception {
        // Initialize the database
        partenaireRepository.saveAndFlush(partenaire);

        int databaseSizeBeforeUpdate = partenaireRepository.findAll().size();

        // Update the partenaire using partial update
        Partenaire partialUpdatedPartenaire = new Partenaire();
        partialUpdatedPartenaire.setId(partenaire.getId());

        partialUpdatedPartenaire
            .denominationPartenaire(UPDATED_DENOMINATION_PARTENAIRE)
            .categorieProvenaire(UPDATED_CATEGORIE_PROVENAIRE)
            .autreCategorie(UPDATED_AUTRE_CATEGORIE)
            .nature(UPDATED_NATURE)
            .autreNature(UPDATED_AUTRE_NATURE);

        restPartenaireMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPartenaire.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPartenaire))
            )
            .andExpect(status().isOk());

        // Validate the Partenaire in the database
        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeUpdate);
        Partenaire testPartenaire = partenaireList.get(partenaireList.size() - 1);
        assertThat(testPartenaire.getDenominationPartenaire()).isEqualTo(UPDATED_DENOMINATION_PARTENAIRE);
        assertThat(testPartenaire.getCategorieProvenaire()).isEqualTo(UPDATED_CATEGORIE_PROVENAIRE);
        assertThat(testPartenaire.getAutreCategorie()).isEqualTo(UPDATED_AUTRE_CATEGORIE);
        assertThat(testPartenaire.getNature()).isEqualTo(UPDATED_NATURE);
        assertThat(testPartenaire.getAutreNature()).isEqualTo(UPDATED_AUTRE_NATURE);
    }

    @Test
    @Transactional
    void patchNonExistingPartenaire() throws Exception {
        int databaseSizeBeforeUpdate = partenaireRepository.findAll().size();
        partenaire.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPartenaireMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partenaire.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partenaire))
            )
            .andExpect(status().isBadRequest());

        // Validate the Partenaire in the database
        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPartenaire() throws Exception {
        int databaseSizeBeforeUpdate = partenaireRepository.findAll().size();
        partenaire.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPartenaireMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partenaire))
            )
            .andExpect(status().isBadRequest());

        // Validate the Partenaire in the database
        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPartenaire() throws Exception {
        int databaseSizeBeforeUpdate = partenaireRepository.findAll().size();
        partenaire.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPartenaireMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(partenaire))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Partenaire in the database
        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePartenaire() throws Exception {
        // Initialize the database
        partenaireRepository.saveAndFlush(partenaire);

        int databaseSizeBeforeDelete = partenaireRepository.findAll().size();

        // Delete the partenaire
        restPartenaireMockMvc
            .perform(delete(ENTITY_API_URL_ID, partenaire.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
