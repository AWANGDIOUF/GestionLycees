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
import mefpai.gouv.sn.domain.ReformeMatiere;
import mefpai.gouv.sn.domain.enumeration.Group;
import mefpai.gouv.sn.repository.ReformeMatiereRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link ReformeMatiereResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ReformeMatiereResourceIT {

    private static final Group DEFAULT_GROUP = Group.GROUP1;
    private static final Group UPDATED_GROUP = Group.GROUP2;

    private static final byte[] DEFAULT_DESIGNATION_DESMEMBRE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_DESIGNATION_DESMEMBRE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_DESIGNATION_DESMEMBRE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_DESIGNATION_DESMEMBRE_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_PV_REFORME = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PV_REFORME = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PV_REFORME_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PV_REFORME_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_SORTIE_DEFINITIVE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_SORTIE_DEFINITIVE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_SORTIE_DEFINITIVE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_SORTIE_DEFINITIVE_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_CERTIFICAT_ADMINISTRATIF = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_CERTIFICAT_ADMINISTRATIF = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE = "image/png";

    private static final String ENTITY_API_URL = "/api/reforme-matieres";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ReformeMatiereRepository reformeMatiereRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restReformeMatiereMockMvc;

    private ReformeMatiere reformeMatiere;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReformeMatiere createEntity(EntityManager em) {
        ReformeMatiere reformeMatiere = new ReformeMatiere()
            .group(DEFAULT_GROUP)
            .designationDesmembre(DEFAULT_DESIGNATION_DESMEMBRE)
            .designationDesmembreContentType(DEFAULT_DESIGNATION_DESMEMBRE_CONTENT_TYPE)
            .pvReforme(DEFAULT_PV_REFORME)
            .pvReformeContentType(DEFAULT_PV_REFORME_CONTENT_TYPE)
            .sortieDefinitive(DEFAULT_SORTIE_DEFINITIVE)
            .sortieDefinitiveContentType(DEFAULT_SORTIE_DEFINITIVE_CONTENT_TYPE)
            .certificatAdministratif(DEFAULT_CERTIFICAT_ADMINISTRATIF)
            .certificatAdministratifContentType(DEFAULT_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE);
        return reformeMatiere;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReformeMatiere createUpdatedEntity(EntityManager em) {
        ReformeMatiere reformeMatiere = new ReformeMatiere()
            .group(UPDATED_GROUP)
            .designationDesmembre(UPDATED_DESIGNATION_DESMEMBRE)
            .designationDesmembreContentType(UPDATED_DESIGNATION_DESMEMBRE_CONTENT_TYPE)
            .pvReforme(UPDATED_PV_REFORME)
            .pvReformeContentType(UPDATED_PV_REFORME_CONTENT_TYPE)
            .sortieDefinitive(UPDATED_SORTIE_DEFINITIVE)
            .sortieDefinitiveContentType(UPDATED_SORTIE_DEFINITIVE_CONTENT_TYPE)
            .certificatAdministratif(UPDATED_CERTIFICAT_ADMINISTRATIF)
            .certificatAdministratifContentType(UPDATED_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE);
        return reformeMatiere;
    }

    @BeforeEach
    public void initTest() {
        reformeMatiere = createEntity(em);
    }

    @Test
    @Transactional
    void createReformeMatiere() throws Exception {
        int databaseSizeBeforeCreate = reformeMatiereRepository.findAll().size();
        // Create the ReformeMatiere
        restReformeMatiereMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reformeMatiere))
            )
            .andExpect(status().isCreated());

        // Validate the ReformeMatiere in the database
        List<ReformeMatiere> reformeMatiereList = reformeMatiereRepository.findAll();
        assertThat(reformeMatiereList).hasSize(databaseSizeBeforeCreate + 1);
        ReformeMatiere testReformeMatiere = reformeMatiereList.get(reformeMatiereList.size() - 1);
        assertThat(testReformeMatiere.getGroup()).isEqualTo(DEFAULT_GROUP);
        assertThat(testReformeMatiere.getDesignationDesmembre()).isEqualTo(DEFAULT_DESIGNATION_DESMEMBRE);
        assertThat(testReformeMatiere.getDesignationDesmembreContentType()).isEqualTo(DEFAULT_DESIGNATION_DESMEMBRE_CONTENT_TYPE);
        assertThat(testReformeMatiere.getPvReforme()).isEqualTo(DEFAULT_PV_REFORME);
        assertThat(testReformeMatiere.getPvReformeContentType()).isEqualTo(DEFAULT_PV_REFORME_CONTENT_TYPE);
        assertThat(testReformeMatiere.getSortieDefinitive()).isEqualTo(DEFAULT_SORTIE_DEFINITIVE);
        assertThat(testReformeMatiere.getSortieDefinitiveContentType()).isEqualTo(DEFAULT_SORTIE_DEFINITIVE_CONTENT_TYPE);
        assertThat(testReformeMatiere.getCertificatAdministratif()).isEqualTo(DEFAULT_CERTIFICAT_ADMINISTRATIF);
        assertThat(testReformeMatiere.getCertificatAdministratifContentType()).isEqualTo(DEFAULT_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void createReformeMatiereWithExistingId() throws Exception {
        // Create the ReformeMatiere with an existing ID
        reformeMatiere.setId(1L);

        int databaseSizeBeforeCreate = reformeMatiereRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restReformeMatiereMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reformeMatiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReformeMatiere in the database
        List<ReformeMatiere> reformeMatiereList = reformeMatiereRepository.findAll();
        assertThat(reformeMatiereList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllReformeMatieres() throws Exception {
        // Initialize the database
        reformeMatiereRepository.saveAndFlush(reformeMatiere);

        // Get all the reformeMatiereList
        restReformeMatiereMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reformeMatiere.getId().intValue())))
            .andExpect(jsonPath("$.[*].group").value(hasItem(DEFAULT_GROUP.toString())))
            .andExpect(jsonPath("$.[*].designationDesmembreContentType").value(hasItem(DEFAULT_DESIGNATION_DESMEMBRE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].designationDesmembre").value(hasItem(Base64Utils.encodeToString(DEFAULT_DESIGNATION_DESMEMBRE))))
            .andExpect(jsonPath("$.[*].pvReformeContentType").value(hasItem(DEFAULT_PV_REFORME_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].pvReforme").value(hasItem(Base64Utils.encodeToString(DEFAULT_PV_REFORME))))
            .andExpect(jsonPath("$.[*].sortieDefinitiveContentType").value(hasItem(DEFAULT_SORTIE_DEFINITIVE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].sortieDefinitive").value(hasItem(Base64Utils.encodeToString(DEFAULT_SORTIE_DEFINITIVE))))
            .andExpect(jsonPath("$.[*].certificatAdministratifContentType").value(hasItem(DEFAULT_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE)))
            .andExpect(
                jsonPath("$.[*].certificatAdministratif").value(hasItem(Base64Utils.encodeToString(DEFAULT_CERTIFICAT_ADMINISTRATIF)))
            );
    }

    @Test
    @Transactional
    void getReformeMatiere() throws Exception {
        // Initialize the database
        reformeMatiereRepository.saveAndFlush(reformeMatiere);

        // Get the reformeMatiere
        restReformeMatiereMockMvc
            .perform(get(ENTITY_API_URL_ID, reformeMatiere.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(reformeMatiere.getId().intValue()))
            .andExpect(jsonPath("$.group").value(DEFAULT_GROUP.toString()))
            .andExpect(jsonPath("$.designationDesmembreContentType").value(DEFAULT_DESIGNATION_DESMEMBRE_CONTENT_TYPE))
            .andExpect(jsonPath("$.designationDesmembre").value(Base64Utils.encodeToString(DEFAULT_DESIGNATION_DESMEMBRE)))
            .andExpect(jsonPath("$.pvReformeContentType").value(DEFAULT_PV_REFORME_CONTENT_TYPE))
            .andExpect(jsonPath("$.pvReforme").value(Base64Utils.encodeToString(DEFAULT_PV_REFORME)))
            .andExpect(jsonPath("$.sortieDefinitiveContentType").value(DEFAULT_SORTIE_DEFINITIVE_CONTENT_TYPE))
            .andExpect(jsonPath("$.sortieDefinitive").value(Base64Utils.encodeToString(DEFAULT_SORTIE_DEFINITIVE)))
            .andExpect(jsonPath("$.certificatAdministratifContentType").value(DEFAULT_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE))
            .andExpect(jsonPath("$.certificatAdministratif").value(Base64Utils.encodeToString(DEFAULT_CERTIFICAT_ADMINISTRATIF)));
    }

    @Test
    @Transactional
    void getNonExistingReformeMatiere() throws Exception {
        // Get the reformeMatiere
        restReformeMatiereMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewReformeMatiere() throws Exception {
        // Initialize the database
        reformeMatiereRepository.saveAndFlush(reformeMatiere);

        int databaseSizeBeforeUpdate = reformeMatiereRepository.findAll().size();

        // Update the reformeMatiere
        ReformeMatiere updatedReformeMatiere = reformeMatiereRepository.findById(reformeMatiere.getId()).get();
        // Disconnect from session so that the updates on updatedReformeMatiere are not directly saved in db
        em.detach(updatedReformeMatiere);
        updatedReformeMatiere
            .group(UPDATED_GROUP)
            .designationDesmembre(UPDATED_DESIGNATION_DESMEMBRE)
            .designationDesmembreContentType(UPDATED_DESIGNATION_DESMEMBRE_CONTENT_TYPE)
            .pvReforme(UPDATED_PV_REFORME)
            .pvReformeContentType(UPDATED_PV_REFORME_CONTENT_TYPE)
            .sortieDefinitive(UPDATED_SORTIE_DEFINITIVE)
            .sortieDefinitiveContentType(UPDATED_SORTIE_DEFINITIVE_CONTENT_TYPE)
            .certificatAdministratif(UPDATED_CERTIFICAT_ADMINISTRATIF)
            .certificatAdministratifContentType(UPDATED_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE);

        restReformeMatiereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedReformeMatiere.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedReformeMatiere))
            )
            .andExpect(status().isOk());

        // Validate the ReformeMatiere in the database
        List<ReformeMatiere> reformeMatiereList = reformeMatiereRepository.findAll();
        assertThat(reformeMatiereList).hasSize(databaseSizeBeforeUpdate);
        ReformeMatiere testReformeMatiere = reformeMatiereList.get(reformeMatiereList.size() - 1);
        assertThat(testReformeMatiere.getGroup()).isEqualTo(UPDATED_GROUP);
        assertThat(testReformeMatiere.getDesignationDesmembre()).isEqualTo(UPDATED_DESIGNATION_DESMEMBRE);
        assertThat(testReformeMatiere.getDesignationDesmembreContentType()).isEqualTo(UPDATED_DESIGNATION_DESMEMBRE_CONTENT_TYPE);
        assertThat(testReformeMatiere.getPvReforme()).isEqualTo(UPDATED_PV_REFORME);
        assertThat(testReformeMatiere.getPvReformeContentType()).isEqualTo(UPDATED_PV_REFORME_CONTENT_TYPE);
        assertThat(testReformeMatiere.getSortieDefinitive()).isEqualTo(UPDATED_SORTIE_DEFINITIVE);
        assertThat(testReformeMatiere.getSortieDefinitiveContentType()).isEqualTo(UPDATED_SORTIE_DEFINITIVE_CONTENT_TYPE);
        assertThat(testReformeMatiere.getCertificatAdministratif()).isEqualTo(UPDATED_CERTIFICAT_ADMINISTRATIF);
        assertThat(testReformeMatiere.getCertificatAdministratifContentType()).isEqualTo(UPDATED_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingReformeMatiere() throws Exception {
        int databaseSizeBeforeUpdate = reformeMatiereRepository.findAll().size();
        reformeMatiere.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReformeMatiereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, reformeMatiere.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reformeMatiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReformeMatiere in the database
        List<ReformeMatiere> reformeMatiereList = reformeMatiereRepository.findAll();
        assertThat(reformeMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchReformeMatiere() throws Exception {
        int databaseSizeBeforeUpdate = reformeMatiereRepository.findAll().size();
        reformeMatiere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReformeMatiereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reformeMatiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReformeMatiere in the database
        List<ReformeMatiere> reformeMatiereList = reformeMatiereRepository.findAll();
        assertThat(reformeMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamReformeMatiere() throws Exception {
        int databaseSizeBeforeUpdate = reformeMatiereRepository.findAll().size();
        reformeMatiere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReformeMatiereMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reformeMatiere)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ReformeMatiere in the database
        List<ReformeMatiere> reformeMatiereList = reformeMatiereRepository.findAll();
        assertThat(reformeMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateReformeMatiereWithPatch() throws Exception {
        // Initialize the database
        reformeMatiereRepository.saveAndFlush(reformeMatiere);

        int databaseSizeBeforeUpdate = reformeMatiereRepository.findAll().size();

        // Update the reformeMatiere using partial update
        ReformeMatiere partialUpdatedReformeMatiere = new ReformeMatiere();
        partialUpdatedReformeMatiere.setId(reformeMatiere.getId());

        partialUpdatedReformeMatiere
            .sortieDefinitive(UPDATED_SORTIE_DEFINITIVE)
            .sortieDefinitiveContentType(UPDATED_SORTIE_DEFINITIVE_CONTENT_TYPE);

        restReformeMatiereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReformeMatiere.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReformeMatiere))
            )
            .andExpect(status().isOk());

        // Validate the ReformeMatiere in the database
        List<ReformeMatiere> reformeMatiereList = reformeMatiereRepository.findAll();
        assertThat(reformeMatiereList).hasSize(databaseSizeBeforeUpdate);
        ReformeMatiere testReformeMatiere = reformeMatiereList.get(reformeMatiereList.size() - 1);
        assertThat(testReformeMatiere.getGroup()).isEqualTo(DEFAULT_GROUP);
        assertThat(testReformeMatiere.getDesignationDesmembre()).isEqualTo(DEFAULT_DESIGNATION_DESMEMBRE);
        assertThat(testReformeMatiere.getDesignationDesmembreContentType()).isEqualTo(DEFAULT_DESIGNATION_DESMEMBRE_CONTENT_TYPE);
        assertThat(testReformeMatiere.getPvReforme()).isEqualTo(DEFAULT_PV_REFORME);
        assertThat(testReformeMatiere.getPvReformeContentType()).isEqualTo(DEFAULT_PV_REFORME_CONTENT_TYPE);
        assertThat(testReformeMatiere.getSortieDefinitive()).isEqualTo(UPDATED_SORTIE_DEFINITIVE);
        assertThat(testReformeMatiere.getSortieDefinitiveContentType()).isEqualTo(UPDATED_SORTIE_DEFINITIVE_CONTENT_TYPE);
        assertThat(testReformeMatiere.getCertificatAdministratif()).isEqualTo(DEFAULT_CERTIFICAT_ADMINISTRATIF);
        assertThat(testReformeMatiere.getCertificatAdministratifContentType()).isEqualTo(DEFAULT_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateReformeMatiereWithPatch() throws Exception {
        // Initialize the database
        reformeMatiereRepository.saveAndFlush(reformeMatiere);

        int databaseSizeBeforeUpdate = reformeMatiereRepository.findAll().size();

        // Update the reformeMatiere using partial update
        ReformeMatiere partialUpdatedReformeMatiere = new ReformeMatiere();
        partialUpdatedReformeMatiere.setId(reformeMatiere.getId());

        partialUpdatedReformeMatiere
            .group(UPDATED_GROUP)
            .designationDesmembre(UPDATED_DESIGNATION_DESMEMBRE)
            .designationDesmembreContentType(UPDATED_DESIGNATION_DESMEMBRE_CONTENT_TYPE)
            .pvReforme(UPDATED_PV_REFORME)
            .pvReformeContentType(UPDATED_PV_REFORME_CONTENT_TYPE)
            .sortieDefinitive(UPDATED_SORTIE_DEFINITIVE)
            .sortieDefinitiveContentType(UPDATED_SORTIE_DEFINITIVE_CONTENT_TYPE)
            .certificatAdministratif(UPDATED_CERTIFICAT_ADMINISTRATIF)
            .certificatAdministratifContentType(UPDATED_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE);

        restReformeMatiereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReformeMatiere.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReformeMatiere))
            )
            .andExpect(status().isOk());

        // Validate the ReformeMatiere in the database
        List<ReformeMatiere> reformeMatiereList = reformeMatiereRepository.findAll();
        assertThat(reformeMatiereList).hasSize(databaseSizeBeforeUpdate);
        ReformeMatiere testReformeMatiere = reformeMatiereList.get(reformeMatiereList.size() - 1);
        assertThat(testReformeMatiere.getGroup()).isEqualTo(UPDATED_GROUP);
        assertThat(testReformeMatiere.getDesignationDesmembre()).isEqualTo(UPDATED_DESIGNATION_DESMEMBRE);
        assertThat(testReformeMatiere.getDesignationDesmembreContentType()).isEqualTo(UPDATED_DESIGNATION_DESMEMBRE_CONTENT_TYPE);
        assertThat(testReformeMatiere.getPvReforme()).isEqualTo(UPDATED_PV_REFORME);
        assertThat(testReformeMatiere.getPvReformeContentType()).isEqualTo(UPDATED_PV_REFORME_CONTENT_TYPE);
        assertThat(testReformeMatiere.getSortieDefinitive()).isEqualTo(UPDATED_SORTIE_DEFINITIVE);
        assertThat(testReformeMatiere.getSortieDefinitiveContentType()).isEqualTo(UPDATED_SORTIE_DEFINITIVE_CONTENT_TYPE);
        assertThat(testReformeMatiere.getCertificatAdministratif()).isEqualTo(UPDATED_CERTIFICAT_ADMINISTRATIF);
        assertThat(testReformeMatiere.getCertificatAdministratifContentType()).isEqualTo(UPDATED_CERTIFICAT_ADMINISTRATIF_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingReformeMatiere() throws Exception {
        int databaseSizeBeforeUpdate = reformeMatiereRepository.findAll().size();
        reformeMatiere.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReformeMatiereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, reformeMatiere.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(reformeMatiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReformeMatiere in the database
        List<ReformeMatiere> reformeMatiereList = reformeMatiereRepository.findAll();
        assertThat(reformeMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchReformeMatiere() throws Exception {
        int databaseSizeBeforeUpdate = reformeMatiereRepository.findAll().size();
        reformeMatiere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReformeMatiereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(reformeMatiere))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReformeMatiere in the database
        List<ReformeMatiere> reformeMatiereList = reformeMatiereRepository.findAll();
        assertThat(reformeMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamReformeMatiere() throws Exception {
        int databaseSizeBeforeUpdate = reformeMatiereRepository.findAll().size();
        reformeMatiere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReformeMatiereMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(reformeMatiere))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ReformeMatiere in the database
        List<ReformeMatiere> reformeMatiereList = reformeMatiereRepository.findAll();
        assertThat(reformeMatiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteReformeMatiere() throws Exception {
        // Initialize the database
        reformeMatiereRepository.saveAndFlush(reformeMatiere);

        int databaseSizeBeforeDelete = reformeMatiereRepository.findAll().size();

        // Delete the reformeMatiere
        restReformeMatiereMockMvc
            .perform(delete(ENTITY_API_URL_ID, reformeMatiere.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ReformeMatiere> reformeMatiereList = reformeMatiereRepository.findAll();
        assertThat(reformeMatiereList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
