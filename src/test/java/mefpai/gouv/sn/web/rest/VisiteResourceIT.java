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
import mefpai.gouv.sn.domain.Visite;
import mefpai.gouv.sn.domain.enumeration.NatureV;
import mefpai.gouv.sn.domain.enumeration.ProvenanceV;
import mefpai.gouv.sn.repository.VisiteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

// import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link VisiteResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class VisiteResourceIT {

    private static final NatureV DEFAULT_NATURE = NatureV.ADMINITRATIVE;
    private static final NatureV UPDATED_NATURE = NatureV.PEDAGOGIQUE;

    private static final String DEFAULT_AUTRE_NATURE = "AAAAAAAAAA";
    private static final String UPDATED_AUTRE_NATURE = "BBBBBBBBBB";

    private static final ProvenanceV DEFAULT_PROVENANCE = ProvenanceV.NIVEAU_CENTRAL;
    private static final ProvenanceV UPDATED_PROVENANCE = ProvenanceV.PEDAGOGIQUE;

    private static final String DEFAULT_AUTRE_PROVENANCE = "AAAAAAAAAA";
    private static final String UPDATED_AUTRE_PROVENANCE = "BBBBBBBBBB";

    private static final String DEFAULT_OBJET = "AAAAAAAAAA";
    private static final String UPDATED_OBJET = "BBBBBBBBBB";

    private static final String DEFAULT_RESULTATS = "AAAAAAAAAA";
    private static final String UPDATED_RESULTATS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_PERIODE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PERIODE = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/visites";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private VisiteRepository visiteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVisiteMockMvc;

    private Visite visite;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Visite createEntity(EntityManager em) {
        Visite visite = new Visite()
            .nature(DEFAULT_NATURE)
            .autreNature(DEFAULT_AUTRE_NATURE)
            .provenance(DEFAULT_PROVENANCE)
            .autreProvenance(DEFAULT_AUTRE_PROVENANCE)
            .objet(DEFAULT_OBJET)
            .resultats(DEFAULT_RESULTATS)
            .periode(DEFAULT_PERIODE);
        return visite;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Visite createUpdatedEntity(EntityManager em) {
        Visite visite = new Visite()
            .nature(UPDATED_NATURE)
            .autreNature(UPDATED_AUTRE_NATURE)
            .provenance(UPDATED_PROVENANCE)
            .autreProvenance(UPDATED_AUTRE_PROVENANCE)
            .objet(UPDATED_OBJET)
            .resultats(UPDATED_RESULTATS)
            .periode(UPDATED_PERIODE);
        return visite;
    }

    @BeforeEach
    public void initTest() {
        visite = createEntity(em);
    }

    @Test
    @Transactional
    void createVisite() throws Exception {
        int databaseSizeBeforeCreate = visiteRepository.findAll().size();
        // Create the Visite
        restVisiteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(visite)))
            .andExpect(status().isCreated());

        // Validate the Visite in the database
        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeCreate + 1);
        Visite testVisite = visiteList.get(visiteList.size() - 1);
        assertThat(testVisite.getNature()).isEqualTo(DEFAULT_NATURE);
        assertThat(testVisite.getAutreNature()).isEqualTo(DEFAULT_AUTRE_NATURE);
        assertThat(testVisite.getProvenance()).isEqualTo(DEFAULT_PROVENANCE);
        assertThat(testVisite.getAutreProvenance()).isEqualTo(DEFAULT_AUTRE_PROVENANCE);
        assertThat(testVisite.getObjet()).isEqualTo(DEFAULT_OBJET);
        assertThat(testVisite.getResultats()).isEqualTo(DEFAULT_RESULTATS);
        assertThat(testVisite.getPeriode()).isEqualTo(DEFAULT_PERIODE);
    }

    @Test
    @Transactional
    void createVisiteWithExistingId() throws Exception {
        // Create the Visite with an existing ID
        visite.setId(1L);

        int databaseSizeBeforeCreate = visiteRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restVisiteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(visite)))
            .andExpect(status().isBadRequest());

        // Validate the Visite in the database
        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNatureIsRequired() throws Exception {
        int databaseSizeBeforeTest = visiteRepository.findAll().size();
        // set the field null
        visite.setNature(null);

        // Create the Visite, which fails.

        restVisiteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(visite)))
            .andExpect(status().isBadRequest());

        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkProvenanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = visiteRepository.findAll().size();
        // set the field null
        visite.setProvenance(null);

        // Create the Visite, which fails.

        restVisiteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(visite)))
            .andExpect(status().isBadRequest());

        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPeriodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = visiteRepository.findAll().size();
        // set the field null
        visite.setPeriode(null);

        // Create the Visite, which fails.

        restVisiteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(visite)))
            .andExpect(status().isBadRequest());

        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllVisites() throws Exception {
        // Initialize the database
        visiteRepository.saveAndFlush(visite);

        // Get all the visiteList
        restVisiteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(visite.getId().intValue())))
            .andExpect(jsonPath("$.[*].nature").value(hasItem(DEFAULT_NATURE.toString())))
            .andExpect(jsonPath("$.[*].autreNature").value(hasItem(DEFAULT_AUTRE_NATURE)))
            .andExpect(jsonPath("$.[*].provenance").value(hasItem(DEFAULT_PROVENANCE.toString())))
            .andExpect(jsonPath("$.[*].autreProvenance").value(hasItem(DEFAULT_AUTRE_PROVENANCE)))
            .andExpect(jsonPath("$.[*].objet").value(hasItem(DEFAULT_OBJET.toString())))
            .andExpect(jsonPath("$.[*].resultats").value(hasItem(DEFAULT_RESULTATS.toString())))
            .andExpect(jsonPath("$.[*].periode").value(hasItem(DEFAULT_PERIODE.toString())));
    }

    @Test
    @Transactional
    void getVisite() throws Exception {
        // Initialize the database
        visiteRepository.saveAndFlush(visite);

        // Get the visite
        restVisiteMockMvc
            .perform(get(ENTITY_API_URL_ID, visite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(visite.getId().intValue()))
            .andExpect(jsonPath("$.nature").value(DEFAULT_NATURE.toString()))
            .andExpect(jsonPath("$.autreNature").value(DEFAULT_AUTRE_NATURE))
            .andExpect(jsonPath("$.provenance").value(DEFAULT_PROVENANCE.toString()))
            .andExpect(jsonPath("$.autreProvenance").value(DEFAULT_AUTRE_PROVENANCE))
            .andExpect(jsonPath("$.objet").value(DEFAULT_OBJET.toString()))
            .andExpect(jsonPath("$.resultats").value(DEFAULT_RESULTATS.toString()))
            .andExpect(jsonPath("$.periode").value(DEFAULT_PERIODE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingVisite() throws Exception {
        // Get the visite
        restVisiteMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewVisite() throws Exception {
        // Initialize the database
        visiteRepository.saveAndFlush(visite);

        int databaseSizeBeforeUpdate = visiteRepository.findAll().size();

        // Update the visite
        Visite updatedVisite = visiteRepository.findById(visite.getId()).get();
        // Disconnect from session so that the updates on updatedVisite are not directly saved in db
        em.detach(updatedVisite);
        updatedVisite
            .nature(UPDATED_NATURE)
            .autreNature(UPDATED_AUTRE_NATURE)
            .provenance(UPDATED_PROVENANCE)
            .autreProvenance(UPDATED_AUTRE_PROVENANCE)
            .objet(UPDATED_OBJET)
            .resultats(UPDATED_RESULTATS)
            .periode(UPDATED_PERIODE);

        restVisiteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedVisite.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedVisite))
            )
            .andExpect(status().isOk());

        // Validate the Visite in the database
        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeUpdate);
        Visite testVisite = visiteList.get(visiteList.size() - 1);
        assertThat(testVisite.getNature()).isEqualTo(UPDATED_NATURE);
        assertThat(testVisite.getAutreNature()).isEqualTo(UPDATED_AUTRE_NATURE);
        assertThat(testVisite.getProvenance()).isEqualTo(UPDATED_PROVENANCE);
        assertThat(testVisite.getAutreProvenance()).isEqualTo(UPDATED_AUTRE_PROVENANCE);
        assertThat(testVisite.getObjet()).isEqualTo(UPDATED_OBJET);
        assertThat(testVisite.getResultats()).isEqualTo(UPDATED_RESULTATS);
        assertThat(testVisite.getPeriode()).isEqualTo(UPDATED_PERIODE);
    }

    @Test
    @Transactional
    void putNonExistingVisite() throws Exception {
        int databaseSizeBeforeUpdate = visiteRepository.findAll().size();
        visite.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVisiteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, visite.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(visite))
            )
            .andExpect(status().isBadRequest());

        // Validate the Visite in the database
        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchVisite() throws Exception {
        int databaseSizeBeforeUpdate = visiteRepository.findAll().size();
        visite.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVisiteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(visite))
            )
            .andExpect(status().isBadRequest());

        // Validate the Visite in the database
        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamVisite() throws Exception {
        int databaseSizeBeforeUpdate = visiteRepository.findAll().size();
        visite.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVisiteMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(visite)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Visite in the database
        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateVisiteWithPatch() throws Exception {
        // Initialize the database
        visiteRepository.saveAndFlush(visite);

        int databaseSizeBeforeUpdate = visiteRepository.findAll().size();

        // Update the visite using partial update
        Visite partialUpdatedVisite = new Visite();
        partialUpdatedVisite.setId(visite.getId());

        partialUpdatedVisite.autreProvenance(UPDATED_AUTRE_PROVENANCE).resultats(UPDATED_RESULTATS).periode(UPDATED_PERIODE);

        restVisiteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVisite.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVisite))
            )
            .andExpect(status().isOk());

        // Validate the Visite in the database
        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeUpdate);
        Visite testVisite = visiteList.get(visiteList.size() - 1);
        assertThat(testVisite.getNature()).isEqualTo(DEFAULT_NATURE);
        assertThat(testVisite.getAutreNature()).isEqualTo(DEFAULT_AUTRE_NATURE);
        assertThat(testVisite.getProvenance()).isEqualTo(DEFAULT_PROVENANCE);
        assertThat(testVisite.getAutreProvenance()).isEqualTo(UPDATED_AUTRE_PROVENANCE);
        assertThat(testVisite.getObjet()).isEqualTo(DEFAULT_OBJET);
        assertThat(testVisite.getResultats()).isEqualTo(UPDATED_RESULTATS);
        assertThat(testVisite.getPeriode()).isEqualTo(UPDATED_PERIODE);
    }

    @Test
    @Transactional
    void fullUpdateVisiteWithPatch() throws Exception {
        // Initialize the database
        visiteRepository.saveAndFlush(visite);

        int databaseSizeBeforeUpdate = visiteRepository.findAll().size();

        // Update the visite using partial update
        Visite partialUpdatedVisite = new Visite();
        partialUpdatedVisite.setId(visite.getId());

        partialUpdatedVisite
            .nature(UPDATED_NATURE)
            .autreNature(UPDATED_AUTRE_NATURE)
            .provenance(UPDATED_PROVENANCE)
            .autreProvenance(UPDATED_AUTRE_PROVENANCE)
            .objet(UPDATED_OBJET)
            .resultats(UPDATED_RESULTATS)
            .periode(UPDATED_PERIODE);

        restVisiteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVisite.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVisite))
            )
            .andExpect(status().isOk());

        // Validate the Visite in the database
        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeUpdate);
        Visite testVisite = visiteList.get(visiteList.size() - 1);
        assertThat(testVisite.getNature()).isEqualTo(UPDATED_NATURE);
        assertThat(testVisite.getAutreNature()).isEqualTo(UPDATED_AUTRE_NATURE);
        assertThat(testVisite.getProvenance()).isEqualTo(UPDATED_PROVENANCE);
        assertThat(testVisite.getAutreProvenance()).isEqualTo(UPDATED_AUTRE_PROVENANCE);
        assertThat(testVisite.getObjet()).isEqualTo(UPDATED_OBJET);
        assertThat(testVisite.getResultats()).isEqualTo(UPDATED_RESULTATS);
        assertThat(testVisite.getPeriode()).isEqualTo(UPDATED_PERIODE);
    }

    @Test
    @Transactional
    void patchNonExistingVisite() throws Exception {
        int databaseSizeBeforeUpdate = visiteRepository.findAll().size();
        visite.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVisiteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, visite.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(visite))
            )
            .andExpect(status().isBadRequest());

        // Validate the Visite in the database
        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchVisite() throws Exception {
        int databaseSizeBeforeUpdate = visiteRepository.findAll().size();
        visite.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVisiteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(visite))
            )
            .andExpect(status().isBadRequest());

        // Validate the Visite in the database
        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamVisite() throws Exception {
        int databaseSizeBeforeUpdate = visiteRepository.findAll().size();
        visite.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVisiteMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(visite)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Visite in the database
        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteVisite() throws Exception {
        // Initialize the database
        visiteRepository.saveAndFlush(visite);

        int databaseSizeBeforeDelete = visiteRepository.findAll().size();

        // Delete the visite
        restVisiteMockMvc
            .perform(delete(ENTITY_API_URL_ID, visite.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Visite> visiteList = visiteRepository.findAll();
        assertThat(visiteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
