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
import mefpai.gouv.sn.domain.Proviseur;
import mefpai.gouv.sn.repository.ProviseurRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ProviseurResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProviseurResourceIT {

    private static final String DEFAULT_NOM_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM_PRENOM = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/proviseurs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProviseurRepository proviseurRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProviseurMockMvc;

    private Proviseur proviseur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Proviseur createEntity(EntityManager em) {
        Proviseur proviseur = new Proviseur().nomPrenom(DEFAULT_NOM_PRENOM);
        return proviseur;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Proviseur createUpdatedEntity(EntityManager em) {
        Proviseur proviseur = new Proviseur().nomPrenom(UPDATED_NOM_PRENOM);
        return proviseur;
    }

    @BeforeEach
    public void initTest() {
        proviseur = createEntity(em);
    }

    @Test
    @Transactional
    void createProviseur() throws Exception {
        int databaseSizeBeforeCreate = proviseurRepository.findAll().size();
        // Create the Proviseur
        restProviseurMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(proviseur)))
            .andExpect(status().isCreated());

        // Validate the Proviseur in the database
        List<Proviseur> proviseurList = proviseurRepository.findAll();
        assertThat(proviseurList).hasSize(databaseSizeBeforeCreate + 1);
        Proviseur testProviseur = proviseurList.get(proviseurList.size() - 1);
        assertThat(testProviseur.getNomPrenom()).isEqualTo(DEFAULT_NOM_PRENOM);
    }

    @Test
    @Transactional
    void createProviseurWithExistingId() throws Exception {
        // Create the Proviseur with an existing ID
        proviseur.setId(1L);

        int databaseSizeBeforeCreate = proviseurRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProviseurMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(proviseur)))
            .andExpect(status().isBadRequest());

        // Validate the Proviseur in the database
        List<Proviseur> proviseurList = proviseurRepository.findAll();
        assertThat(proviseurList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = proviseurRepository.findAll().size();
        // set the field null
        proviseur.setNomPrenom(null);

        // Create the Proviseur, which fails.

        restProviseurMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(proviseur)))
            .andExpect(status().isBadRequest());

        List<Proviseur> proviseurList = proviseurRepository.findAll();
        assertThat(proviseurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllProviseurs() throws Exception {
        // Initialize the database
        proviseurRepository.saveAndFlush(proviseur);

        // Get all the proviseurList
        restProviseurMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(proviseur.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomPrenom").value(hasItem(DEFAULT_NOM_PRENOM)));
    }

    @Test
    @Transactional
    void getProviseur() throws Exception {
        // Initialize the database
        proviseurRepository.saveAndFlush(proviseur);

        // Get the proviseur
        restProviseurMockMvc
            .perform(get(ENTITY_API_URL_ID, proviseur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(proviseur.getId().intValue()))
            .andExpect(jsonPath("$.nomPrenom").value(DEFAULT_NOM_PRENOM));
    }

    @Test
    @Transactional
    void getNonExistingProviseur() throws Exception {
        // Get the proviseur
        restProviseurMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewProviseur() throws Exception {
        // Initialize the database
        proviseurRepository.saveAndFlush(proviseur);

        int databaseSizeBeforeUpdate = proviseurRepository.findAll().size();

        // Update the proviseur
        Proviseur updatedProviseur = proviseurRepository.findById(proviseur.getId()).get();
        // Disconnect from session so that the updates on updatedProviseur are not directly saved in db
        em.detach(updatedProviseur);
        updatedProviseur.nomPrenom(UPDATED_NOM_PRENOM);

        restProviseurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedProviseur.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedProviseur))
            )
            .andExpect(status().isOk());

        // Validate the Proviseur in the database
        List<Proviseur> proviseurList = proviseurRepository.findAll();
        assertThat(proviseurList).hasSize(databaseSizeBeforeUpdate);
        Proviseur testProviseur = proviseurList.get(proviseurList.size() - 1);
        assertThat(testProviseur.getNomPrenom()).isEqualTo(UPDATED_NOM_PRENOM);
    }

    @Test
    @Transactional
    void putNonExistingProviseur() throws Exception {
        int databaseSizeBeforeUpdate = proviseurRepository.findAll().size();
        proviseur.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProviseurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, proviseur.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(proviseur))
            )
            .andExpect(status().isBadRequest());

        // Validate the Proviseur in the database
        List<Proviseur> proviseurList = proviseurRepository.findAll();
        assertThat(proviseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchProviseur() throws Exception {
        int databaseSizeBeforeUpdate = proviseurRepository.findAll().size();
        proviseur.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProviseurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(proviseur))
            )
            .andExpect(status().isBadRequest());

        // Validate the Proviseur in the database
        List<Proviseur> proviseurList = proviseurRepository.findAll();
        assertThat(proviseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamProviseur() throws Exception {
        int databaseSizeBeforeUpdate = proviseurRepository.findAll().size();
        proviseur.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProviseurMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(proviseur)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Proviseur in the database
        List<Proviseur> proviseurList = proviseurRepository.findAll();
        assertThat(proviseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProviseurWithPatch() throws Exception {
        // Initialize the database
        proviseurRepository.saveAndFlush(proviseur);

        int databaseSizeBeforeUpdate = proviseurRepository.findAll().size();

        // Update the proviseur using partial update
        Proviseur partialUpdatedProviseur = new Proviseur();
        partialUpdatedProviseur.setId(proviseur.getId());

        restProviseurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProviseur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProviseur))
            )
            .andExpect(status().isOk());

        // Validate the Proviseur in the database
        List<Proviseur> proviseurList = proviseurRepository.findAll();
        assertThat(proviseurList).hasSize(databaseSizeBeforeUpdate);
        Proviseur testProviseur = proviseurList.get(proviseurList.size() - 1);
        assertThat(testProviseur.getNomPrenom()).isEqualTo(DEFAULT_NOM_PRENOM);
    }

    @Test
    @Transactional
    void fullUpdateProviseurWithPatch() throws Exception {
        // Initialize the database
        proviseurRepository.saveAndFlush(proviseur);

        int databaseSizeBeforeUpdate = proviseurRepository.findAll().size();

        // Update the proviseur using partial update
        Proviseur partialUpdatedProviseur = new Proviseur();
        partialUpdatedProviseur.setId(proviseur.getId());

        partialUpdatedProviseur.nomPrenom(UPDATED_NOM_PRENOM);

        restProviseurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProviseur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProviseur))
            )
            .andExpect(status().isOk());

        // Validate the Proviseur in the database
        List<Proviseur> proviseurList = proviseurRepository.findAll();
        assertThat(proviseurList).hasSize(databaseSizeBeforeUpdate);
        Proviseur testProviseur = proviseurList.get(proviseurList.size() - 1);
        assertThat(testProviseur.getNomPrenom()).isEqualTo(UPDATED_NOM_PRENOM);
    }

    @Test
    @Transactional
    void patchNonExistingProviseur() throws Exception {
        int databaseSizeBeforeUpdate = proviseurRepository.findAll().size();
        proviseur.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProviseurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, proviseur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(proviseur))
            )
            .andExpect(status().isBadRequest());

        // Validate the Proviseur in the database
        List<Proviseur> proviseurList = proviseurRepository.findAll();
        assertThat(proviseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchProviseur() throws Exception {
        int databaseSizeBeforeUpdate = proviseurRepository.findAll().size();
        proviseur.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProviseurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(proviseur))
            )
            .andExpect(status().isBadRequest());

        // Validate the Proviseur in the database
        List<Proviseur> proviseurList = proviseurRepository.findAll();
        assertThat(proviseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamProviseur() throws Exception {
        int databaseSizeBeforeUpdate = proviseurRepository.findAll().size();
        proviseur.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProviseurMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(proviseur))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Proviseur in the database
        List<Proviseur> proviseurList = proviseurRepository.findAll();
        assertThat(proviseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteProviseur() throws Exception {
        // Initialize the database
        proviseurRepository.saveAndFlush(proviseur);

        int databaseSizeBeforeDelete = proviseurRepository.findAll().size();

        // Delete the proviseur
        restProviseurMockMvc
            .perform(delete(ENTITY_API_URL_ID, proviseur.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Proviseur> proviseurList = proviseurRepository.findAll();
        assertThat(proviseurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
